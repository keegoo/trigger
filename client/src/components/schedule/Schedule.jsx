import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import LinearProgress from 'material-ui/LinearProgress'
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

  statusBar(status) {
    if(false) {
      return( <LinearProgress mode="indeterminate" /> )
    } else {
      return( <LinearProgress mode="determinate" value={100} color={white} /> )
    }
  }

  render (){
    const schedule = this.props.schedule
    // get the soonest task
    const nearT = schedule.tasks.slice().sort((x, y) => x.time > y.time)[0].time
    // const isoToday = new Date(Date.now()).toISOString().split('.')[0]+"Z"

    return(
      <div style={this.props.status === 'waiting' ? styles.borderActive : styles.borderInactive}>
        {this.statusBar(this.props.status)}
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan="4" style={styles.tableTitle}>
                <Link to={`/monitor/${schedule._id}`} style={styles.monitorLink} >
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
              schedule.tasks.map((s, index) => {
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
  schedule:   PropTypes.object.isRequired,
  status:     PropTypes.oneOf(['running', 'waiting', 'stopped', 'error', 'missed'])
}

export default Schedule
