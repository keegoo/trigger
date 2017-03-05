import React from 'react'
import ServerList from './ServerList.js'
import TextField from 'material-ui/TextField'
import NcTable from './NcTable.js'


class Scheduler extends React.Component {
  constructor (){
    super()
    this.state = {
      servers: [
        {id: 1, name: "APC-WGGenerator1"},
        {id: 2, name: "APC-WGGenerator2"},
        {id: 3, name: "APC-WGGenerator3"},
        {id: 4, name: "APC-WGGenerator4"},
        {id: 5, name: "SF1-WGGenerator5"},
        {id: 6, name: "SF1-WGGenerator6"},
        {id: 7, name: "SF1-WGGenerator7"},
        {id: 8, name: "SF1-WGGenerator8"}
      ],
      filterStr: "",
      serverSelected: [
        {id: 7, name: "SF1-WGGenerator7"},
        {id: 4, name: "APC-WGGenerator4"}
      ]
    }
  }

  render (){
    return(
      <div className="scheduler">
        <span>Generators available: </span>
        <TextField 
          onChange={ e => this.setState({ filterStr: e.target.value })}
          hintText="Filter" />
        <br />
        <ServerList servers={this.state.servers.filter( e => e.name.includes(this.state.filterStr))}/>

        <div className="generator-table">
          <div><span>Generators selected: </span></div>
          <NcTable servers={this.state.serverSelected} />
        </div>
      </div>
    )
  }
}

export default Scheduler