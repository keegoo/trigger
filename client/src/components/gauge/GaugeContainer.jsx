import React from 'react'
import Gauge from './Gauge.jsx'

class GaugeContainer extends React.Component {
  render() {
    return (
      <div>
        <Gauge type='users' label='200' />
        <Gauge type='duration' label='23:20:16' />
        <Gauge type='hits' label='98,120' />
        <Gauge type='errors' label='7' />
      </div>
    )
  }
}

export default GaugeContainer