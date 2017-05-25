import React from 'react'
import PropTypes from 'prop-types'
import * as utils from './../utils.js'
import Gauge from './Gauge.jsx'

const styles = {
  layout: {
    display: 'grid',
    gridGap: '15px',
    gridTemplateRows: '1fr 1fr 1fr'
  }
}

class GaugeContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      secondsPassed: 0
    }

    this.dida = this.dida.bind(this)
    this.secondsToHHMMSS = this.secondsToHHMMSS.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(this.dida, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  dida() {
    if(this.props.enableTimerTick) {
      this.setState({ secondsPassed: this.state.secondsPassed + 1 })
    }
  }

  secondsToHHMMSS(sec=0) {
    console.log(`secondsToHHMMSS: ${sec}`)
    const ss = sec % 60
    const leftSeconds = sec - ss
    const leftMinutes = leftSeconds / 60
    const mm = leftMinutes % 60
    const hh = (leftMinutes - mm) / 60

    return `${utils.leadingZero(hh)}:${utils.leadingZero(mm)}:${utils.leadingZero(ss)}`
  }

  render() { 
    return (
      <div style={styles.layout}>
        <Gauge 
          title='Duration'
          iconType='duration'
          sublabel='Time.'
          label={this.secondsToHHMMSS(this.state.secondsPassed  + this.props.baseTimeAsSeconds)} />
        {
          this.props.data.map((x, index) => {
            return(
              <Gauge key={index}
                title={x.title}
                iconType={x.iconType}
                sublabel={x.sublabel}
                label={x.label} />
            )
          })
        }
      </div>
    )
  }
}

GaugeContainer.propTypes = {
  data:               PropTypes.array.isRequired,
  enableTimerTick:    PropTypes.bool.isRequired,
  baseTimeAsSeconds:  PropTypes.number.isRequired
}

export default GaugeContainer