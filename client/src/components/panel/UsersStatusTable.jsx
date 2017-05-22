import React from 'react'
import PropTypes from 'prop-types'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import { grey400, grey300 } from 'material-ui/styles/colors'

const styles = {
  border: {
    border: `solid 1px ${grey300}`
  }
}

class UsersStatusTable extends React.Component {
  constructor(props) {
    super(props)
  }

  toRowTag(group, index) {
    return(
      <TableRow key={index} selectable={false} >
        <TableRowColumn>{group.name}</TableRowColumn>
        <TableRowColumn>{group.running}</TableRowColumn>
        <TableRowColumn>{group.stopped}</TableRowColumn>
      </TableRow>
    )
  }

  render() {
    return(
      <div style={styles.border}>
        <Table>
          <TableHeader
            adjustForCheckbox={false} 
            displaySelectAll={false} >
            <TableRow>
              {
                ["Generator", "Running", "Stopped"].map((title, index) => {
                  return <TableHeaderColumn key={index}>{title}</TableHeaderColumn>
                })
              }
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            {
              this.props.groups.map((group, index) => {
                return this.toRowTag(group, index)
              })
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

UsersStatusTable.propTypes = {
  groups:   PropTypes.array.isRequired
}

export default UsersStatusTable