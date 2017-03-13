import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

class HsTable extends React.Component {
  render (){
    const t = this.props.historicalInfo

    return(
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>{t.date}</TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Time</TableHeaderColumn>
            <TableHeaderColumn>Module</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            t.schedule.map((s) => {
              return(
                <TableRow>
                  <TableRowColumn>{s.generator}</TableRowColumn>
                  <TableRowColumn>{s.time}</TableRowColumn>
                  <TableRowColumn>{s.module}</TableRowColumn>
                  <TableRowColumn>{s.status}</TableRowColumn>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    )
  }
}

export default HsTable