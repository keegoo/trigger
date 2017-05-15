import React from 'react'
import Gauge from './Gauge.jsx'

const styles = {
  layout: {
    display: 'grid',
    gridGap: '50px',
    gridTemplateColumns: '1fr 1fr 1fr',
    margin: '10px 0 10px 0'
  }
}

class GaugeContainer extends React.Component {
  render() {
    return (
      <div style={styles.layout}>
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