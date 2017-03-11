import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

class ComingFewDays extends React.Component {

  constructor() {
    super()
    this.state = {
      value: 1
    }
  }

  dateStartFromToday(num){
    const oneDay = 24 * 60 * 60 * 1000
    const t = new Date(Date.now() + oneDay * num)
    return `${t.getDate()}-${t.getMonth()}-${t.getFullYear()}`
  }

  handleDateChange (event, index, obj){
    console.log(obj.text)
    this.setState({value: index})
  }

  render() {
    return(
      <DropDownMenu
        value={this.state.value}
        onChange={(e) => this.handleDateChange}
      >
        <MenuItem value={1} label={this.dateStartFromToday(0)} primaryText="Today" />
        <MenuItem value={2} label={this.dateStartFromToday(1)} primaryText="Tomorrow" />
        <MenuItem value={3} label={this.dateStartFromToday(2)} primaryText="The day after tomorrow" />
      </DropDownMenu>
    )
  }
}

export default ComingFewDays