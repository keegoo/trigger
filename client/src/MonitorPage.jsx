import React from 'react'
import Heading from './components/heading/Heading.jsx'
import MonitorChartContainer from './components/charts/MonitorChartContainer.jsx'
import MonitorPanelContainer from './components/panel/MonitorPanelContainer.jsx'
import Loading from './components/loading/Loading.jsx'
import * as utils from './components/utils.js'
import Config from 'Config'

const styles = {
  width: '60%',
  margin: 'auto',
  minWidth: '800px'
}

class MonitorPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      // ==================================
      // schedule example:
      // {
      //   "_id": "591ad79d8fb238037416b836",
      //   "tasks": [
      //     {
      //       "generator": "APC-WGROAPP301",
      //       "status": "disconnected",
      //       "running": 0,
      //       "stopped": 0
      //     },
      //     {
      //       "generator": "APC-WGROAPP302",
      //       "status": "disconnected",
      //       "running": 0,
      //       "stopped": 0
      //     },
      //   ]
      //   "total_errors": 0,
      //   "total_hits": 0
      // }
      schedule: {},

      // ==================================
      // execution example:
      // [{
      //   "_id": "59193db18fb2380224bda165",
      //   "hour": "2017-05-15T05:00:00Z",
      //   "values": {
      //     "52": {
      //       "12": 11,
      //       "18": 6,
      //       "24": 6,
      //       "30": 6,
      //       "36": 1
      //       }
      //     }
      //   },
      //   ...
      // ]
      tunnelData: {},
      progress: "unknown",
      baseTimeAsSeconds: 0,

      finishLoadSchedule: false,
      finishLoadTunnelData: false,
      finishLoadProgress: false
    }

    this.doEverySixSeconds = this.doEverySixSeconds.bind(this)
    this.fetchSchedule = this.fetchSchedule.bind(this)
    this.fetchScheduleProgress = this.fetchScheduleProgress.bind(this)
    this.fetchTunnelData = this.fetchTunnelData.bind(this)
    this.getTunnelDataMixTime = this.getTunnelDataMixTime.bind(this)
    this.setBaseTime = this.setBaseTime.bind(this)
    this.doWhenStatusChanged = this.doWhenStatusChanged.bind(this)

    // as 
    // 1). the Execution finished time are extracted from TunnelDate; 
    // 2). Execution finished time was needed when Progress changed,
    // 3). the Execution begin time are extracted from Schedule
    // 4). Execution begin time was needed when Progress changed
    // so I need to fetch TunnelData and Schedule first, then fetch Progress.

    const id = this.props.params.scheduleId
    Promise.all([this.fetchSchedule(id), this.fetchTunnelData(id)])
      .then(() => this.fetchScheduleProgress(id))
  }

  componentDidMount() {
    this.interval = setInterval(this.doEverySixSeconds, 6000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  fetchSchedule(id) {
    const host = Config.host
    return fetch(`${host}/schedulers/${id}`)
      .then(response => response.json())
      .then(json => { 
        this.setState({schedule: json})
      })
      .then(() => {
        this.setState({finishLoadSchedule: true})
      })
  }

  fetchScheduleProgress(id) {
    const host = Config.host
    return fetch(`${host}/schedulers/${id}/progress`)
      .then(response => response.json())
      .then(json => { 
        if(this.state.progress !== json.progress){
          this.doWhenStatusChanged(json.progress)
        }
        this.setState({progress: json.progress})
      })
      .then(() => {
        this.setState({finishLoadProgress: true})
      })
  }

  fetchTunnelData(id) {
    const host = Config.host
    return fetch(`${host}/schedulers/${id}/tunnel_data`)
      .then(response => response.json())
      .then(json => {
        this.setState({ tunnelData: json })
      })
      .then(() => {
        this.setState({ finishLoadTunnelData: true })
      })
  }

  doEverySixSeconds() {
    const sheduleId = this.props.params.scheduleId

    if(this.state.progress === 'running') {
      this.fetchSchedule(sheduleId)
      this.fetchTunnelData(sheduleId)
    }

    this.fetchScheduleProgress(sheduleId)
  }

  doWhenStatusChanged(newStatus) {
    this.setBaseTime(newStatus)
  }

  getTunnelDataMixTime(values, hour) {
    const sortedMinutes = Object.keys(values).map(x => parseInt(x)).sort((a, b) => a < b)
    const maxMinute = sortedMinutes[0]
    const sortedSeconds = Object.keys(values[maxMinute.toString()]).sort((a, b) => a < b)
    const maxSecond = sortedSeconds[0]
    
    // turn 2017-05-21T14:00:00Z into 2017-05-21T14,
    // and concat 2017-05-21T14 + MM + SS
    return `${hour.split(':')[0]}:${utils.leadingZero(maxMinute)}:${utils.leadingZero(maxSecond)}Z`
  }

  setBaseTime(status) {
    const a = new Date(this.state.schedule.tasks[0].time)
    let b = a

    const latest = this.state.tunnelData.sort((x, y) => x.hour < y.hour)[0]
    if(latest !== undefined) {
      b = new Date(this.getTunnelDataMixTime(latest.values, latest.hour))
    } 

    this.setState({ baseTimeAsSeconds: Math.round( (b - a) / 1000 )})
  }

  render() {
    if (this.state.finishLoadSchedule && this.state.finishLoadProgress && this.state.finishLoadTunnelData) {
      return(
        <div style={styles}>
          <Heading 
            title={utils.splitISOToDateTime(this.state.schedule.tasks[0].time)[0]}
            status={this.state.progress} />
          <MonitorPanelContainer
            schedule={this.state.schedule} 
            baseTimeAsSeconds={this.state.baseTimeAsSeconds}
            enableTimerTick={this.state.progress === 'running' ? true : false} />
          <MonitorChartContainer 
            tunnelData={this.state.tunnelData} />
        </div>
      )
    } else {
      return (
        <Loading />
      )
    }
  }
}

export default MonitorPage