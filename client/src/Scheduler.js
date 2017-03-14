import React from 'react'
import ServerList from './ServerList.js'
import TextField from 'material-ui/TextField'
import NcTable from './NcTable.js'
import ComingFewDays from './ComingFewDays.js'
import Paper from 'material-ui/Paper'

// save delete icon
import SaveIcon from 'material-ui/svg-icons/content/save'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

// icon float right
const styles = {
  icon: {
    float: 'right'
  }
}

class Scheduler extends React.Component {
  constructor (){
    super()
    this.handleServerClick = this.handleServerClick.bind(this)
    this.state = {
      generators: [],
      filterStr: "",
      serverSelected: [
        {id: 7, name: "SF1-WGGenerator7"},
        {id: 4, name: "APC-WGGenerator4"}
      ],
      borderWidth: 0
    }
  }

  componentDidMount(){
    const host = "http://127.0.0.1:3000"
    fetch(`${host}/generators`)
      .then(response => response.json())
      .then(json => {
        this.setState({generators: json})
      })
  }

  handleServerClick(server){
    let len = this.state.serverSelected.filter((s) => s.name === server.name).length
    if (len == 1) {
      this.removeServerFromSchedule(server)
    } else {
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

  handleHoverPaper (){

  }

  render (){
    return(
      <div className="scheduler">
        <br />
        <span>Generators available: </span>
        <TextField 
          onChange={ e => this.setState({ filterStr: e.target.value })}
          hintText="Filter" />
        <br />
        <ServerList 
          generators={this.state.generators.filter( e => e.name.includes(this.state.filterStr))}
          filterStr={this.state.filterStr}
          handleClick={this.handleServerClick}
          />
        <br />
        <Paper 
          className="generator-table" 
          zDepth={this.state.borderWidth} 
          onMouseEnter={ e => this.setState({ borderWidth: 1 })} 
          onMouseLeave={ e => this.setState({ borderWidth: 0 })}
        >
          <div><span>Generators selected: </span></div>
          <ComingFewDays />
          <br />
          <SaveIcon style={styles.icon} />
          <DeleteIcon style={styles.icon} />
          <NcTable generators={this.state.serverSelected} />
        </Paper>
      </div>
    )
  }
}

export default Scheduler