import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import { grey500, grey400, cyan400 } from 'material-ui/styles/colors'
import * as utils from './../utils.js'

const white = '#FFFFFF'

const styles = {
  borderInactive: {
    boxShadow: `${grey400} 0px 0px 5px`,
    marginBottom: '20px'
  },

  borderActive: {
    boxShadow: `${cyan400} 0px 0px 5px`,
    marginBottom: '20px'
  },

  monitorLink: {
    textDecoration: 'none',
    color: grey500
  },

  tableTitle: {
    textAlign: 'center'
  }
}

class Schedule extends React.Component {
  constructor(props){
    super(props)
  }

  render (){
    const t = this.props.historicalInfo
    // get the nearest task
    const nearT = t.tasks.slice().sort((x, y) => x.time > y.time)[0].time
    const isoToday = new Date(Date.now()).toISOString().split('.')[0]+"Z"

    return(
      <div style={isoToday < nearT ? styles.borderActive : styles.borderInactive}>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan="4" style={styles.tableTitle}>
                <Link to={`/monitor/${t._id}`} style={styles.monitorLink} >
                  <FlatButton fullWidth={true} hoverColor={white}>
                    {utils.splitISOToDateTime(nearT)[0]}
                  </FlatButton>
                </Link>
              </TableHeaderColumn>
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
              t.tasks.map((s, index) => {
                return(
                  <TableRow key={index}>
                    <TableRowColumn>{s.generator}</TableRowColumn>
                    <TableRowColumn>{utils.splitISOToDateTime(s.time)[1].substring(0, 5)}</TableRowColumn>
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

Schedule.propTypes = {
  historicalInfo:    PropTypes.object.isRequired
}

export default Schedule
