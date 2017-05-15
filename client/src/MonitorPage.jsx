import React from 'react'
import Heading from './components/heading/Heading.jsx'
import GaugeContainer from './components/gauge/GaugeContainer.jsx'
import MonitorContainer from './components/monitor/MonitorContainer.jsx'
import UsersContainer from './components/users/UsersContainer.jsx'
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
      finishLoadScheduler: false,
      finishLoadExecution: false
    }

    this.fetchScheduler = this.fetchScheduler.bind(this)

    this.fetchScheduler(this.props.params.scheduleId)
    this.fetchExecution(this.props.params.scheduleId)
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

  fetchExecution(id) {
    const host = Config.host
    fetch(`${host}/schedulers/${id}/executions/all`)
      .then(response => response.json())
      .then(json => { 
        this.setState({finishLoadExecution: true})
        // console.log(json)
      })
  }

  render() {
    if (this.state.finishLoadScheduler && this.state.finishLoadExecution) {
      return(
        <div style={styles}>
          <Heading 
            title={utils.splitISOToDateTime(this.state.scheduler.schedule[0].time)[0]}
            status='waiting' />
          <GaugeContainer />
          <UsersContainer
            generators={this.state.scheduler.schedule.map((x) => x.generator)} />
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