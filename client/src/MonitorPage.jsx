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

      finishLoadSchedule: false,
      finishLoadTunnelData: false,
      finishLoadProgress: false,
      progress: "stopped"

    }

    this.doEverySixSeconds = this.doEverySixSeconds.bind(this)
    this.fetchSchedule = this.fetchSchedule.bind(this)
    this.fetchScheduleProgress = this.fetchScheduleProgress.bind(this)
    this.fetchTunnelData = this.fetchTunnelData.bind(this)

    this.fetchSchedule(this.props.params.scheduleId)
    this.fetchScheduleProgress(this.props.params.scheduleId)
    this.fetchTunnelData(this.props.params.scheduleId)
  }

  componentDidMount() {
    this.interval = setInterval(this.doEverySixSeconds, 6000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  doEverySixSeconds() {
    const sheduleId = this.props.params.scheduleId

    if(this.state.progress === 'running') {
      this.fetchSchedule(sheduleId)
      this.fetchTunnelData(sheduleId)
    }

    this.fetchScheduleProgress(sheduleId)
  }

  fetchSchedule(id) {
    const host = Config.host
    fetch(`${host}/schedulers/${id}`)
      .then(response => response.json())
      .then(json => { 
        this.setState({schedule: json})
        this.setState({finishLoadSchedule: true})
        // console.log(json)
      })
  }

  fetchScheduleProgress(id) {
    const host = Config.host
    fetch(`${host}/schedulers/${id}/progress`)
      .then(response => response.json())
      .then(json => { 
        this.setState({progress: json.progress})
        this.setState({finishLoadProgress: true})
        // console.log(json)
      })
  }

  fetchTunnelData(id) {
    const host = Config.host
    fetch(`${host}/schedulers/${id}/tunnel_data`)
      .then(response => response.json())
      .then(json => { 
        this.setState({ tunnelData: json })
        this.setState({ finishLoadTunnelData: true })
        // console.log(json)
      })
  }

  render() {
    if (this.state.finishLoadSchedule && this.state.finishLoadProgress && this.state.finishLoadTunnelData) {
      return(
        <div style={styles}>
          <Heading 
            title={utils.splitISOToDateTime(this.state.schedule.tasks[0].time)[0]}
            status={this.state.progress} />
          <MonitorPanelContainer
            schedule={this.state.schedule} />
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