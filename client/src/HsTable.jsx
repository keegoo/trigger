import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

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

class HsTable extends React.Component {

  isoDateToday(time){
    const t = new Date(Date.now())
    return t.toISOString().split('.')[0]+"Z"
  }

  render (){
    const t = this.props.historicalInfo
    
    return(
      <div style={this.isoDateToday() < t.date ? styles.borderActive : styles.borderInactive}>
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
              t.schedule.map((s, index) => {
                return(
                  <TableRow key={index}>
                    <TableRowColumn>{s.generator}</TableRowColumn>
                    <TableRowColumn>{s.time}</TableRowColumn>
                    <TableRowColumn>{s.cmd}</TableRowColumn>
                    <TableRowColumn>{s.status}</TableRowColumn>
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

export default HsTable
