import React from 'react'
import PropTypes from 'prop-types'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import * as utils from './../utils.js'

const styles = {
  menuItem: {
    width: '180px'
  }
}

class DatePicker extends React.Component {

  render() {
    return(
      <DropDownMenu
        value={this.props.value}
        onChange={this.props.handleDateChange} >
        <MenuItem value={0} label={utils.dateStartFromToday(0)} primaryText="Today" style={styles.menuItem}/>
        <MenuItem value={1} label={utils.dateStartFromToday(1)} primaryText="Tomorrow" style={styles.menuItem}/>
        <MenuItem value={2} label={utils.dateStartFromToday(2)} primaryText="The day after tomorrow" style={styles.menuItem}/>
      </DropDownMenu>
    )
  }
}

DatePicker.propTypes = {
  value:              PropTypes.number.isRequired,
  handleDateChange:   PropTypes.func.isRequired
}

export default DatePicker