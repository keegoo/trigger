import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import injectTapEventPlugin from 'react-tap-event-plugin'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'

import {orange500, blue500, gray500} from 'material-ui/styles/colors'

class NcTable extends React.Component {

  constructor(){
    super()
    this.schedulerData = []
    this.state = {
      autoComplete: [
        "ping 127.0.0.1 -t",
        "gatling -v -t 600s"
      ],
      timeFormat: {}
    }
  }

  handleTextFieldOnBlur(server, e){
    let rightFormat = this.checkTimeFormat(e.target.value)
    let rightRange = this.checkTimeRange(e.target.value)
    if (rightFormat && rightRange){
      this.setState({timeFormat: {}})
      this.props.saveTime(server, e.target.value)
    } else {
      this.setState({timeFormat: {borderColor: orange500}})
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

  handleAutoCompleteUpdate(server, value) {
    this.props.saveCMD(server, value)
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

  toRowTag(server, index) {
    return(
      <TableRow key={index} selectable={false}>
        <TableRowColumn>{server.name}</TableRowColumn>
        <TableRowColumn>
          <TextField 
            name=""
            hintText="e.g. 1:9 or 23:11"
            underlineStyle={this.state.timeFormat}
            onBlur={this.handleTextFieldOnBlur.bind(this, server.name)}
            />
        </TableRowColumn>
        <TableRowColumn>
          <AutoComplete
            hintText="any commands"
            dataSource={this.state.autoComplete}
            onUpdateInput={this.handleAutoCompleteUpdate.bind(this, server.name)}
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
            this.props.generators.map((server, index) => {
              return this.toRowTag(server, index)
            })
          }
        </TableBody>
      </Table>
    )
  }
}

export default NcTable