import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import injectTapEventPlugin from 'react-tap-event-plugin'
import TextField from 'material-ui/TextField'

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

  overwritePartialDefaultText(str){
    console.log(str)
  }

  toRowTag(server) {
    return(
      <TableRow>
        <TableRowColumn>{server.name}</TableRowColumn>
        <TableRowColumn>
          <TextField hintText="e.g. 1:9 or 23:11"/>
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