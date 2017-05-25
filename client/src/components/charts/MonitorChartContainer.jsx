import React from 'react'
import PropTypes from 'prop-types'
import Chart from './Chart.jsx'
import * as utils from './../utils.js'
import { cyan500 } from 'material-ui/styles/colors'

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

    this.flatTunnelData = this.flatTunnelData.bind(this)
    this.joinHourlyData = this.joinHourlyData.bind(this)
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
    let sortedKeys = Object.keys(values).map(x => parseInt(x)).sort((a, b) => a > b)
    sortedKeys.forEach((intKey) => {
      let valuesInMinute = values[intKey.toString()]
      let sortedK = Object.keys(valuesInMinute).map(x => parseInt(x)).sort((a, b) => a > b)
      sortedK.forEach((intK) => {
        let unit = {
          t: hour + ':' + utils.leadingZero(intKey.toString()) + ':' + utils.leadingZero(intK.toString()) + 'Z',
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

  render() {
    return (
      <div>
        <div style={styles.title}>Monitor</div>
        <Chart
          chartTitle="Hits per Second"
          data={this.joinHourlyData(this.props.tunnelData)} />
      </div>
    )
  }
}

MonitorChartContainer.propTypes = {
  tunnelData:   PropTypes.array.isRequired
}

export default MonitorChartContainer