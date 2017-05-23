import React from 'react'
import PropTypes from 'prop-types'
import Chart from './Chart.jsx'
import Loading from '../loading/Loading.jsx'
import { cyan500 } from 'material-ui/styles/colors'
import Config from 'Config'

const styles = {
  title: {
    color: cyan500,
    fontSize: '24px',
    margin: '20px 0 10px 0'
  }
}

class MonitorChartContainer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      executionTunnel: {},
      finishLoadTunnel: false
    }

    this.fetchExecutionTunnels = this.fetchExecutionTunnels.bind(this)
    this.flatTunnelData = this.flatTunnelData.bind(this)
    this.doubleDigit = this.doubleDigit.bind(this)
    this.joinHourlyData = this.joinHourlyData.bind(this)

    this.fetchExecutionTunnels(this.props.scheduleId)
  }

  fetchExecutionTunnels(id) {
    const host = Config.host
    fetch(`${host}/schedulers/${id}/tunnel_data`)
      .then(response => response.json())
      .then(json => { 
        this.setState({ executionTunnel: this.joinHourlyData(json) })
        this.setState({ finishLoadTunnel: true })
        // console.log(json)
      })
  }

  // convert 
  // "values": {
  //   "52": {
  //     "12": 11,
  //     "18": 6,
  //     "24": 6,
  //     "30": 6,
  //     "36": 1
  //     }
  //   }
  // into:
  // [
  //   { t: "2017-05-19T11:52:12Z", v: 11 },
  //   { t: "2017-05-19T11:52:18Z", v: 6 },
  //   { t: "2017-05-19T11:52:24Z", v: 6 },
  //   { t: "2017-05-19T11:52:30Z", v: 6 },
  //   { t: "2017-05-19T11:52:36Z", v: 1 }
  // ]
  flatTunnelData(values, hour) {
    let data = []
    let sortedKeys = Object.keys(values).map(x => parseInt(x)).sort()
    sortedKeys.forEach((intKey) => {
      let valuesInMinute = values[intKey.toString()]
      let sortedK = Object.keys(valuesInMinute).map(x => parseInt(x)).sort()
      sortedK.forEach((intK) => {
        let unit = {
          t: hour + ':' + this.doubleDigit(intKey.toString()) + ':' + this.doubleDigit(intK.toString()) + 'Z',
          v: valuesInMinute[intK.toString()]
        }
        data.push(unit)
      })
    })

    return data
  }

  joinHourlyData(jsonData) {
    let data = []
    jsonData.forEach((x) => {
      let hour = x.hour.split(':')[0]
      data = data.concat(this.flatTunnelData(x.values, hour))
    })
    return data
  }

  // change '6' into '06'
  doubleDigit(str) {
    return str.length === 1 ? '0' + str : str
  }

  render() {
    if (this.state.finishLoadTunnel) {
      return (
        <div>
          <div style={styles.title}>Monitor</div>
          <Chart
            chartTitle="Hits per Second"
            data={this.state.executionTunnel} />
        </div>
      )
    } else {
      return(
        <Loading />
      )
    }
  }
}

MonitorChartContainer.propTypes = {
  scheduleId:   PropTypes.string.isRequired,
  progress:     PropTypes.string.isRequired
}

export default MonitorChartContainer