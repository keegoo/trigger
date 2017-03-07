import React from 'react'
import ServerList from './ServerList.js'
import TextField from 'material-ui/TextField'
import NcTable from './NcTable.js'


class Scheduler extends React.Component {
  constructor (){
    super()
    this.handleServerClick = this.handleServerClick.bind(this)
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

  handleServerClick(server){
    let len = this.state.serverSelected.filter((s) => s.name === server.name).length
    if (len == 1) {
      console.log("remove")
      this.removeServerFromSchedule(server)
    } else {
      console.log("add")
      this.addServerToSchedule(server)
    }
  }

  removeServerFromSchedule(server){
    let arr = this.state.serverSelected
    this.setState({serverSelected: arr.filter((s) => s.name !== server.name)})
  }

  addServerToSchedule(server){
    this.setState({serverSelected: this.state.serverSelected.concat(server)})
  }

  render (){
    return(
      <div className="scheduler">
        <span>Generators available: </span>
        <TextField 
          onChange={ e => this.setState({ filterStr: e.target.value })}
          hintText="Filter" />
        <br />
        <ServerList 
          servers={this.state.servers.filter( e => e.name.includes(this.state.filterStr))}
          handleClick={this.handleServerClick}
          />

        <div className="generator-table">
          <div><span>Generators selected: </span></div>
          <NcTable servers={this.state.serverSelected} />
        </div>
      </div>
    )
  }
}

export default Scheduler