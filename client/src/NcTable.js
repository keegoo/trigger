import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import TimePicker from 'material-ui/TimePicker'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class NcTable extends React.Component {

  toColumnTitle() {
    return(
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Time</TableHeaderColumn>
        <TableHeaderColumn>Module</TableHeaderColumn>
      </TableRow>
    )
  }

  toRowTag(server) {
    return(
      <TableRow>
        <TableRowColumn>{server.name}</TableRowColumn>
        <TableRowColumn>
          <TimePicker format="24hr" hintText="24hr Format"></TimePicker>
        </TableRowColumn>
        <TableRowColumn>module be executed</TableRowColumn>
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
            this.props.servers.map((s) => {
              return this.toRowTag(s)
            })
          }
        </TableBody>
      </Table>
    )
  }
}

export default NcTable