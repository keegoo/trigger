import React from 'react'
import Gauge from './Gauge.jsx'

const styles = {
  layout: {
    display: 'grid',
    gridGap: '10px'
  }
}

class GaugeContainer extends React.Component {
  render() {
    return (
      <div style={styles.layout}>
        <Gauge 
          title='Concurrent Users'
          type='users' 
          sublabel='No.' 
          label='200' />
        <Gauge 
          title='Duration'
          type='duration' 
          sublabel='Time.' 
          label='23:20:16' />
        <Gauge 
          title='Total Hits'
          type='hits' 
          sublabel='No.' 
          label='98,120' />
        <Gauge 
          title='Errors'
          type='errors' 
          sublabel='No.' 
          label='7' />
      </div>
    )
  }
}

export default GaugeContainer