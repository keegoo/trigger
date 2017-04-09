import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const styles = {
  menuItem: {
    width: '180px'
  }
}

class ComingFewDays extends React.Component {

  dateStartFromToday(num){
    const oneDay = 24 * 60 * 60 * 1000
    const t = new Date(Date.now() + oneDay * num)
    return `${t.getDate()}-${t.getMonth() + 1}-${t.getFullYear()}`
  }

  render() {
    return(
      <DropDownMenu
        value={this.props.value}
        onChange={this.props.dateChange} >
        <MenuItem value={0} label={this.dateStartFromToday(0)} primaryText="Today" style={styles.menuItem}/>
        <MenuItem value={1} label={this.dateStartFromToday(1)} primaryText="Tomorrow" style={styles.menuItem}/>
        <MenuItem value={2} label={this.dateStartFromToday(2)} primaryText="The day after tomorrow" style={styles.menuItem}/>
      </DropDownMenu>
    )
  }
}

export default ComingFewDays