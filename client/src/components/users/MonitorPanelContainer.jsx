import React from 'react'
import UsersStatusTable from './UsersStatusTable.jsx'
import GaugeContainer from './GaugeContainer.jsx'
import CircularProgress from 'material-ui/CircularProgress'
import { cyan500 } from 'material-ui/styles/colors'
import Config from 'Config'

const styles = {
  title: {
    color: cyan500,
    fontSize: '24px',
    margin: '20px 0 10px 0'
  }
}

class MonitorPanelContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    // ==================================
    // executionSummary example:
    // {
    //   "_id": "591ad79d8fb238037416b836",
    //   "scheduler_id": "591469bb8fb238054bf1e5e7",
    //   "status": [
    //     { "name": "CYS-MACBOOK-PRO.LOCAL", "status": "stopped" }
    //   ],
    //   "total_errors": 33,
    //   "total_hits": 37,
    //   "users": [
    //     { "name": "apc-wgroapp301", "running": 2, "stopped": 2 },
    //     { "name": "CYS-MACBOOK-PRO.LOCAL", "running": 11, "stopped": 14 }
    //   ]
    // }
      executionSummary: {},
      finishLoadSummary: false
    }

    this.doEverySixSeconds = this.doEverySixSeconds.bind(this)
    this.doXSecondsLater = this.doXSecondsLater.bind(this)
    this.fetchExecutionSummary = this.fetchExecutionSummary.bind(this)

    this.fetchExecutionSummary(this.props.schedulerId)
  }

  componentDidMount() {
    switch(this.props.progress) {
      case 'waiting':
        let now = new Date()
        let taskTime = new Date(this.props.taskExecutionTime)
        this.timeOut = setTimeout(this.doXSecondsLater, taskTime - now )
        return
      case 'running':
        this.interval = setInterval(this.doEverySixSeconds, 6000)
        return
      case 'missed':
        console.log('load defult data')
        return
      case 'stopped':
        console.log('load historial data')
        return
      default:
        console.log('are you kidding from MonitorPanelContainer')
        return

    }
  }

  componentWillUnmount() {
    if(!this.interval === undefined) {
      clearInterval(this.interval)
    }

    if(!this.timeOut === undefined) {
      clearTimeout(this.timeOut)
    }
  }

  doEverySixSeconds() {
    this.fetchExecutionSummary(this.props.schedulerId)
  }

  doXSecondsLater() {
    console.log("time to do some thing!")
  }

  fetchExecutionSummary(id) {
    const host = Config.host
    fetch(`${host}/schedulers/${id}/executions/summary_data`)
      .then(response => response.json())
      .then(json => { 
        this.setState({executionSummary: json})
        this.setState({finishLoadSummary: true})
        // console.log(json)
      })
  }

  render() {
    if (this.state.finishLoadSummary) {
      return(
        <div>
          <GaugeContainer />
          <div style={styles.title}>User Allocation</div>
          <UsersStatusTable groups={this.state.executionSummary.status}/> 
        </div>
      )
    } else {    
      return( 
        <CircularProgress /> 
      )
    }
  }
}

export default MonitorPanelContainer