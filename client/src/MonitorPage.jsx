import React from 'react'
import Heading from './components/heading/Heading.jsx'
import MonitorContainer from './components/monitor/MonitorContainer.jsx'
import MonitorPanelContainer from './components/users/MonitorPanelContainer.jsx'
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
      scheduler: {},

      // ==================================
      // execution example:
      // {
      //   "_id": "59193db18fb2380224bda165",
      //   "hour": "2017-05-15T05:00:00Z",
      //   "scheduler_id": "591469bb8fb238054bf1e5e7",
      //   "total_errors": 0,
      //   "total_hits": 84,
      //   "users": {
      //     "CYS-MACBOOK-PRO": {
      //       "LOCAL": {
      //         "started": 3,
      //         "stopped": 2
      //       }
      //     }
      //   },
      //   "values": {
      //     "1": {},
      //     "2": {}
      //     ...
      //   }
      // }
      execution: {},
      finishLoadScheduler: false,
      finishLoadExecution: false,
      finishLoadProgress: false,
      progress: "stopped"

    }

    this.fetchScheduler = this.fetchScheduler.bind(this)
    this.fetchSchedulerProgress = this.fetchSchedulerProgress.bind(this)

    this.fetchScheduler(this.props.params.scheduleId)
    this.fetchSchedulerProgress(this.props.params.scheduleId)
  }

  fetchScheduler(id) {
    const host = Config.host
    fetch(`${host}/schedulers/${id}`)
      .then(response => response.json())
      .then(json => { 
        this.setState({scheduler: json})
        this.setState({finishLoadScheduler: true})
        // console.log(json)
      })
  }

  fetchSchedulerProgress(id) {
    const host = Config.host
    fetch(`${host}/schedulers/${id}/executions/progress`)
      .then(response => response.json())
      .then(json => { 
        this.setState({progress: json.progress})
        this.setState({finishLoadProgress: true})
        // console.log(json)
      })
  }

  render() {
    if (this.state.finishLoadScheduler && this.state.finishLoadProgress) {
      return(
        <div style={styles}>
          <Heading 
            title={utils.splitISOToDateTime(this.state.scheduler.schedule[0].time)[0]}
            status={this.state.progress} />
          <MonitorPanelContainer
            schedulerId={this.props.params.scheduleId}
            taskExecutionTime={this.state.scheduler.schedule[0].time}
            progress={this.state.progress} />
          <MonitorContainer />
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