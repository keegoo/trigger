import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import injectTapEventPlugin from 'react-tap-event-plugin'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'

import {orange500, blue500, gray500} from 'material-ui/styles/colors'

class NcTable extends React.Component {

  constructor(){
    super()
    // let a = this.props.generators.map((x) => x.name)
    // console.log(a)
    this.state = {
      autoComplete: [
        "ping 127.0.0.1 -t",
        "gatling -v -t 600s"
      ],
      timeFormat: {},
      schedulerData: []
    }

    //this.handleTextFieldOnBlur = this.handleTextFieldOnBlur.bind(this)
    //this.handleAutoCompleteUpdate = this.handleAutoCompleteUpdate.bind(this)
  }

  handleTextFieldOnBlur(server, e){
    let rightFormat = this.checkTimeFormat(e.target.value)
    let rightRange = this.checkTimeRange(e.target.value)
    if (rightFormat && rightRange){
      this.setState({timeFormat: {}})
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
    console.log(`server: ${server.name}, value: ${value}`)
    console.log(this.state.schedulerData)
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
            onBlur={this.handleTextFieldOnBlur.bind(this, server)}
            />
        </TableRowColumn>
        <TableRowColumn>
          <AutoComplete
            hintText="any commands"
            dataSource={this.state.autoComplete}
            onUpdateInput={this.handleAutoCompleteUpdate.bind(this, server)}
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