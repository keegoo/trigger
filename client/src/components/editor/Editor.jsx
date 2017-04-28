import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
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

class Editor extends React.Component {
  constructor(){
    super()

    this.state = {
      timeGroup: {}
    }
  }

  handleTextFieldOnBlur(schedule, e){
    let tmp = this.state.timeGroup
    let rightFormat = this.checkTimeFormat(e.target.value)
    let rightRange = this.checkTimeRange(e.target.value)
    if (rightFormat && rightRange){
      tmp[schedule.generator] = true
      this.props.saveTime(schedule, e.target.value)
    } else {
      tmp[schedule.generator] = false
    }
    this.setState({timeGroup: tmp})
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

  handleAutoCompleteUpdate(schedule, value) {
    this.props.saveCMD(schedule, value)
  }

  toRowTag(schedule, index) {
    return(
      <TableRow key={index} selectable={false}>
        <TableRowColumn>{schedule.generator}</TableRowColumn>
        <TableRowColumn>
          <TextField 
            name=""
            hintText="e.g. 01:09 or 23:11"
            underlineStyle={ [true, undefined].includes(this.state.timeGroup[schedule.generator]) ? styles.timeValid : styles.timeInvalid}
            onBlur={this.handleTextFieldOnBlur.bind(this, schedule)} />
        </TableRowColumn>
        <TableRowColumn>
          <AutoComplete
            hintText="any commands"
            dataSource={["ping www.google.com -c 30", "gatling -c entity"]}
            onUpdateInput={this.handleAutoCompleteUpdate.bind(this, schedule)}
          />
        </TableRowColumn>
      </TableRow>
    )
  }

  render() {
    return(
      <Table>
        <TableHeader 
          adjustForCheckbox={false} 
          displaySelectAll={false} >
          <TableRow>
            {
              ["Name", "Time", "Module"].map((title, index) => {
                return <TableHeaderColumn key={index}>{title}</TableHeaderColumn>
              })
            }
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} >
          {
            this.props.generatorsSelected.map((schedule, index) => {
              return this.toRowTag(schedule, index)
            })
          }
        </TableBody>
      </Table>
    )
  }
}

export default Editor