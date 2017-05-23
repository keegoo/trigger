import React from 'react'
import PropTypes from 'prop-types'
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
  }

  render() {
    return (
      <div style={styles.layout}>
        <Gauge 
          title='Duration'
          iconType='duration'
          sublabel='Time.'
          label='00:00:00' />
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
  data:   PropTypes.array.isRequired
}

export default GaugeContainer