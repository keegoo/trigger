import React from 'react'
import Heading from './components/heading/Heading.jsx'
import MonitorChartContainer from './components/charts/MonitorChartContainer.jsx'
import MonitorPanelContainer from './components/panel/MonitorPanelContainer.jsx'
import CircularProgress from 'material-ui/CircularProgress'
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
      // scheduler example:
      // {
      //   "_id": "59105c068fb2380203e11023",
      //   "schedule": [
      //     {
      //       "generator": "APC-WGROAPP301",
      //       "time": "2017-05-09T12:20:00Z",
      //       "cmd": "ping www.google.com -c 30",
      //       "status": ""
      //     }
      //     ...
      //   ]
      // }
      schedule: {},

      // ==================================
      // execution example:
      // {
      //   "_id": "59193db18fb2380224bda165",
      //   "hour": "2017-05-15T05:00:00Z",
      //   "scheduler_id": "591469bb8fb238054bf1e5e7",
      //   "values": {
      //     "1": {},
      //     "2": {}
      //     ...
      //   }
      // }
      execution: {},
      finishLoadschedule: false,
      finishLoadExecution: false,
      finishLoadProgress: false,
      progress: "stopped"

    }

    this.fetchschedule = this.fetchschedule.bind(this)
    this.fetchscheduleProgress = this.fetchscheduleProgress.bind(this)

    this.fetchschedule(this.props.params.scheduleId)
    this.fetchscheduleProgress(this.props.params.scheduleId)
  }

  fetchschedule(id) {
    const host = Config.host
    fetch(`${host}/schedulers/${id}`)
      .then(response => response.json())
      .then(json => { 
        this.setState({schedule: json})
        this.setState({finishLoadschedule: true})
        // console.log(json)
      })
  }

  fetchscheduleProgress(id) {
    const host = Config.host
    fetch(`${host}/schedulers/${id}/progress`)
      .then(response => response.json())
      .then(json => { 
        this.setState({progress: json.progress})
        this.setState({finishLoadProgress: true})
        // console.log(json)
      })
  }

  render() {
    if (this.state.finishLoadschedule && this.state.finishLoadProgress) {
      return(
        <div style={styles}>
          <Heading 
            title={utils.splitISOToDateTime(this.state.schedule.tasks[0].time)[0]}
            status={this.state.progress} />
          <MonitorPanelContainer
            scheduleId={this.props.params.scheduleId}
            taskExecutionTime={this.state.schedule.tasks[0].time}
            progress={this.state.progress} />
          <MonitorChartContainer 
            scheduleId={this.props.params.scheduleId}
            progress={this.state.progress} />
        </div>
      )
    } else {
      return (
        <div style={styles} >
          <CircularProgress />
        </div>
      )
    }
  }
}

export default MonitorPage