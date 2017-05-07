import React from 'react'
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
        <MonitorContainer/>
      </div>
    )
  }
}

export default MonitorPage