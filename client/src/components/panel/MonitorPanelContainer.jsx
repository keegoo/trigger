import React from 'react'
import PropTypes from 'prop-types'
import UsersStatusTable from './UsersStatusTable.jsx'
import GaugeContainer from './GaugeContainer.jsx'

const styles = {
  layout: {
    display: 'grid',
    gridGap: '15px',
    gridTemplateColumns: '3fr 1fr'
  }
}

class MonitorPanelContainer extends React.Component {
  constructor(props) {
    super(props)

    this.mapToGaugeData = this.mapToGaugeData.bind(this)
    this.mapToUsersData = this.mapToUsersData.bind(this)
  }

  mapToGaugeData(schedule) {
    return [
      { title: 'Total Hits',iconType: 'hits',   sublabel: 'No.', label: `${schedule.total_hits}` },
      { title: 'Errors',    iconType: 'errors', sublabel: 'No.', label: `${schedule.total_errors}` }
    ]
  }

  mapToUsersData(schedule) {
    return schedule.tasks.map((x) => { 
      return { 
          name: x.generator, 
          running: x.running, 
          stopped: x.stopped
        } 
    })
  }

  render() {
    return(
      <div style={styles.layout}>
        <UsersStatusTable 
          groups={this.mapToUsersData(this.props.schedule)} /> 
        <GaugeContainer 
          data={this.mapToGaugeData(this.props.schedule)} />
      </div>
    )
  }
}

MonitorPanelContainer.propTypes = {
  schedule:     PropTypes.object.isRequired
}

export default MonitorPanelContainer