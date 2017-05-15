import React from 'react'
import Chart from './Chart.jsx'
import { cyan500 } from 'material-ui/styles/colors'

const styles = {
  title: {
    color: cyan500,
    fontSize: '24px',
    margin: '20px 0 10px 0'
  }
}

class MonitorContainer extends React.Component {
  render() {
    return (
      <div>
        <div style={styles.title}>Monitor</div>
        <Chart />
      </div>
    )
  }
}

export default MonitorContainer