import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

class UserStatusTable extends React.Component {

  toRowTag(group, index) {
    return(
      <TableRow key={index} selectable={false} >
        <TableRowColumn>{group.name}</TableRowColumn>
        <TableRowColumn>{group.target}</TableRowColumn>
        <TableRowColumn>{group.running}</TableRowColumn>
        <TableRowColumn>{group.stopped}</TableRowColumn>
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
              ["Generator", "Target Users", "Running", "Stopped"].map((title, index) => {
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
    )
  }
}

export default UserStatusTable