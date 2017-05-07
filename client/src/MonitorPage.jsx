import React from 'react'
import MonitorContainer from './components/monitor/MonitorContainer.jsx'
import GaugeContainer from './components/gauge/GaugeContainer.jsx'

const styles = {
  width: '60%',
  margin: 'auto',
  minWidth: '800px'
}

class MonitorPage extends React.Component {
  render() {
    return (
      <div style={styles}>
        <MonitorContainer/>
        <GaugeContainer />
      </div>
    )
  }
}

export default MonitorPage