import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import Gauge from './Gauge.jsx'

const counterGaugeHOC = (GaugeComponent) => {
  return class extends React.Component {
    static propTypes = {
      counter:  PropTypes.number.isRequired
    }

    static defaultProps = {
      counter:  0
    }

    insertComma = (num) => num.toLocaleString()
    formatNumber = R.compose(this.insertComma, Number)

    render() {
      const formate = R.ifElse(R.isNil, R.always('0'), this.formatNumber)
      return(
        <GaugeComponent
          {...this.props}
          label={formate(this.props.counter)}
        />
      )
    }
  }
}

export default counterGaugeHOC