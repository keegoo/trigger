import React from 'react'
import PropTypes from 'prop-types'
import TimerIcon from 'material-ui/svg-icons/image/timer'

import * as utils from '../utils.js'
import Gauge from './Gauge.jsx'

const secondsToHHMMSS = (sec=0) => {
  const ss = sec % 60
  const leftSeconds = sec - ss
  const leftMinutes = leftSeconds / 60
  const mm = leftMinutes % 60
  const hh = (leftMinutes - mm) / 60

  return `${utils.leadingZero(hh)}:${utils.leadingZero(mm)}:${utils.leadingZero(ss)}`
}

const TimerGauge = (props) => {
  return(
    <Gauge 
      title='Duration'
      icon={TimerIcon}
      unit='Time.'
      label={secondsToHHMMSS(props.baseTimeAsSeconds)}
    />
  )
}

TimerGauge.propTypes = {
  baseTimeAsSeconds:  PropTypes.number.isRequired
}

TimerGauge.defaultProps = {
  baseTimeAsSeconds:  0
}

export default TimerGauge
