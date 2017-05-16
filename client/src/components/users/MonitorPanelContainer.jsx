import React from 'react'
import UsersStatusTable from './UsersStatusTable.jsx'
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

    this.refreshExecutionSummary = this.refreshExecutionSummary.bind(this)
    this.fetchExecutionSummary = this.fetchExecutionSummary.bind(this)

    this.fetchExecutionSummary(this.props.schedulerId)
  }

  componentDidMount() {
    if(this.props.progress === "stopped") {
      this.interval = setInterval(this.refreshExecutionSummary, 6000)
    }
  }

  componentWillUnmount() {
    if(this.interval === undefined) {
      clearInterval(this.interval)
    }
  }

  refreshExecutionSummary() {
    this.fetchExecutionSummary(this.props.params.schedulerId)
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
    debugger
    if (this.state.finishLoadSummary) {
      return(
        <div>
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