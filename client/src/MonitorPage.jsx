import React from 'react'
import GaugeContainer from './components/gauge/GaugeContainer.jsx'
import MonitorContainer from './components/monitor/MonitorContainer.jsx'
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
      scheduler: {}
    }

    this.fetchScheduler = this.fetchScheduler.bind(this)
  }

  componentDidMount() {
    this.fetchScheduler(this.props.params.scheduleId)
  }

  fetchScheduler(id) {
    const host = Config.host
    fetch(`${host}/schedulers/${id}`)
      .then(response => response.json())
      .then(json => { 
        this.setState({scheduler: json})
        // console.log(json)
      })
  }

  render() {

    console.log(this.props.params.scheduleId)
    console.log(this.state.scheduler)

    return (
      <div style={styles}>
        <GaugeContainer />
        <MonitorContainer/>
      </div>
    )
  }
}

export default MonitorPage