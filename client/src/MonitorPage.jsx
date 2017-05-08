import React from 'react'
import GaugeContainer from './components/gauge/GaugeContainer.jsx'
import MonitorContainer from './components/monitor/MonitorContainer.jsx'

const styles = {
  width: '60%',
  margin: 'auto',
  minWidth: '800px'
}

class MonitorPage extends React.Component {
  render() {
    return (
      <div style={styles}>
        <GaugeContainer />
        <MonitorContainer/>
      </div>
    )
  }
}

export default MonitorPage