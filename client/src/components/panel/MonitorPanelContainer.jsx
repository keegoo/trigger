import React from 'react'
import PropTypes from 'prop-types'
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
  },
  layout: {
    display: 'grid',
    gridGap: '15px',
    gridTemplateColumns: '3fr 1fr'
  }
}

class MonitorPanelContainer extends React.Component {
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
      finishLoadSummary: false
    }

    this.doEverySixSeconds = this.doEverySixSeconds.bind(this)
    this.doXSecondsLater = this.doXSecondsLater.bind(this)
    this.fetchSchedule = this.fetchSchedule.bind(this)
    this.mapToGaugeData = this.mapToGaugeData.bind(this)
    this.mapToUsersData = this.mapToUsersData.bind(this)

    this.fetchSchedule(this.props.scheduleId)
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
        return
      case 'stopped':
        return
      case 'disconnected':
        return
      default:
        console.log('warning: are you kidding from MonitorPanelContainer')
        return
    }
  }

  componentWillUnmount() {
    if(!(this.interval === undefined)) {
      clearInterval(this.interval) 
    } 

    if(!(this.timeOut === undefined)) {
      clearTimeout(this.timeOut)
    }
  }

  doEverySixSeconds() {
    this.fetchSchedule(this.props.scheduleId)
  }

  doXSecondsLater() {
    console.log("time to do some thing!")
  }

  fetchSchedule(id) {
    const host = Config.host
    fetch(`${host}/schedulers/${id}`)
      .then(response => response.json())
      .then(json => { 
        this.setState({schedule: json})
        this.setState({finishLoadSummary: true})
        // console.log(json)
      })
  }

  mapToGaugeData(schedule) {
    return [
      { title: 'Total Hits',iconType: 'hits',   sublabel: 'No.', label: `${schedule.total_hits}` },
      { title: 'Errors',    iconType: 'errors', sublabel: 'No.', label: `${schedule.total_errors}` }
    ]
  }

  mapToUsersData(schedule) {
    return schedule.tasks.map((x) => { 
      return { 
          name: x.generator, 
          running: x.running, 
          stopped: x.stopped
        } 
    })
  }

  render() {
    if (this.state.finishLoadSummary) {
      return(
        <div style={styles.layout}>
          <UsersStatusTable 
            groups={this.mapToUsersData(this.state.schedule)} /> 
          <GaugeContainer 
            data={this.mapToGaugeData(this.state.schedule)} />
        </div>
      )
    } else {    
      return( 
        <CircularProgress /> 
      )
    }
  }
}

MonitorPanelContainer.propTypes = {
  scheduleId:         PropTypes.string.isRequired,
  taskExecutionTime:  PropTypes.string.isRequired,
  progress:           PropTypes.string.isRequired
}

export default MonitorPanelContainer