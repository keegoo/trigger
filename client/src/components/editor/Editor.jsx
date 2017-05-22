import React from 'react'
import PropTypes from 'prop-types'
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

  handleTextFieldOnBlur(generator, e){
    let tmp = this.state.timeGroup
    let rightFormat = this.checkTimeFormat(e.target.value)
    let rightRange = this.checkTimeRange(e.target.value)
    if (rightFormat && rightRange){
      tmp[generator] = true
      this.props.saveTime(generator, e.target.value)
    } else {
      tmp[generator] = false
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

  handleAutoCompleteUpdate(generator, value) {
    this.props.saveCMD(generator, value)
  }

  toRowTag(generator, index) {
    return(
      <TableRow key={index} selectable={false}>
        <TableRowColumn>{generator}</TableRowColumn>
        <TableRowColumn>
          <TextField 
            name=""
            hintText="e.g. 01:09 or 23:11"
            underlineStyle={ [true, undefined].includes(this.state.timeGroup[generator]) ? styles.timeValid : styles.timeInvalid}
            onBlur={this.handleTextFieldOnBlur.bind(this, generator)} />
        </TableRowColumn>
        <TableRowColumn>
          <AutoComplete
            hintText="any commands"
            dataSource={["ping www.google.com -c 30", "gatling -c entity"]}
            onUpdateInput={this.handleAutoCompleteUpdate.bind(this, generator)} />
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
            this.props.generatorsSelected.map((generator, index) => {
              return this.toRowTag(generator, index)
            })
          }
        </TableBody>
      </Table>
    )
  }
}

Editor.propTypes = {
  generatorsSelected:   PropTypes.array.isRequired,
  saveTime:             PropTypes.func.isRequired,
  saveCMD:              PropTypes.func.isRequired
}

export default Editor