import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import injectTapEventPlugin from 'react-tap-event-plugin'
import * as utils from './utils.js'

injectTapEventPlugin()

const styles = {
  menuItem: {
    width: '180px'
  }
}

class ComingFewDays extends React.Component {

  render() {
    return(
      <DropDownMenu
        value={this.props.value}
        onChange={this.props.dateChange} >
        <MenuItem value={0} label={utils.dateStartFromToday(0)} primaryText="Today" style={styles.menuItem}/>
        <MenuItem value={1} label={utils.dateStartFromToday(1)} primaryText="Tomorrow" style={styles.menuItem}/>
        <MenuItem value={2} label={utils.dateStartFromToday(2)} primaryText="The day after tomorrow" style={styles.menuItem}/>
      </DropDownMenu>
    )
  }
}

export default ComingFewDays