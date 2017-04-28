import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import * as utils from './../utils.js'

const styles = {
  borderInactive: {
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px',
    marginBottom: '10px'
  },
  borderActive: {
    boxShadow: 'rgba(0, 188, 212, 1) 0px 0px 10px',
    marginBottom: '10px'
  }
}

class Schedule extends React.Component {

  render (){
    const t = this.props.historicalInfo
    // get the nearest schedule
    const nearT = t.schedule.slice().sort((x, y) => x.time > y.time)[0].time
    const isoToday = new Date(Date.now()).toISOString().split('.')[0]+"Z"

    return(
      <div style={isoToday < nearT ? styles.borderActive : styles.borderInactive}>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>{utils.splitISOToDateTime(nearT)[0]}</TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
              <TableHeaderColumn>Module</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              t.schedule.map((s, index) => {
                return(
                  <TableRow key={index}>
                    <TableRowColumn>{s.generator}</TableRowColumn>
                    <TableRowColumn>{utils.splitISOToDateTime(s.time)[1].substring(0, 5)}</TableRowColumn>
                    <TableRowColumn>{s.cmd}</TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default Schedule
