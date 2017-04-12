import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import injectTapEventPlugin from 'react-tap-event-plugin'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'

import {orange500} from 'material-ui/styles/colors'

const styles = {
  timeInvalid: {
    borderColor: orange500
  },
  timeValid: {
    // empty
  }
}

class NcTable extends React.Component {

  constructor(){
    super()
    this.state = {
      autoComplete: [
        "ping 127.0.0.1 -t",
        "gatling -v -t 600s"
      ],
      isTimeValid: true
    }
  }

  handleTextFieldOnBlur(generator, e){
    let rightFormat = this.checkTimeFormat(e.target.value)
    let rightRange = this.checkTimeRange(e.target.value)
    if (rightFormat && rightRange){
      this.setState({isTimeValid: true})
      this.props.saveTime(generator, e.target.value)
    } else {
      this.setState({isTimeValid: false})
    }
  }

  checkTimeFormat(str){
    // time format should be: HH:MM
    let regex = /^\d\d:\d\d$/m
    let ok = regex.exec(str)
    if(!ok){
      return false
    }
    return true
  }

  checkTimeRange(str){
    let ary = str.split(":")
    let hh = parseInt(ary[0])
    let mm = parseInt(ary[1])
    if ( 0 <= hh && hh < 24 && 0 <= mm  && mm < 60) {
      return true
    } else {
      return false
    }
  }

  handleAutoCompleteUpdate(generator, value) {
    this.props.saveCMD(generator, value)
  }

  toColumnTitle() {
    return(
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Time</TableHeaderColumn>
        <TableHeaderColumn>Module</TableHeaderColumn>
      </TableRow>
    )
  }

  toRowTag(generator, index) {
    return(
      <TableRow key={index} selectable={false}>
        <TableRowColumn>{generator}</TableRowColumn>
        <TableRowColumn>
          <TextField 
            name=""
            hintText="e.g. 1:9 or 23:11"
            underlineStyle={ this.state.isTimeValid ? styles.timeValid : styles.timeInvalid }
            onBlur={this.handleTextFieldOnBlur.bind(this, generator)}
            />
        </TableRowColumn>
        <TableRowColumn>
          <AutoComplete
            hintText="any commands"
            dataSource={this.state.autoComplete}
            onUpdateInput={this.handleAutoCompleteUpdate.bind(this, generator)}
          />
        </TableRowColumn>
      </TableRow>
    )
  }

  render() {
    return(
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          {this.toColumnTitle()}
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.props.generators.map((generator, index) => {
              return this.toRowTag(generator, index)
            })
          }
        </TableBody>
      </Table>
    )
  }
}

export default NcTable