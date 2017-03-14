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
  titleText: {
    fontSize: '24px',
    color: 'rgb(0, 188, 212)',
    marginBottom: '10px',
    marginTop: '20px'
  },
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
      selected: [
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
    let len = this.state.selected.filter((s) => s.name === server.name).length
    if (len == 1) {
      this.removeServerFromSchedule(server)
    } else {
      this.addServerToSchedule(server)
    }
  }

  removeServerFromSchedule(server){
    let arr = this.state.selected
    this.setState({selected: arr.filter((s) => s.name !== server.name)})
  }

  addServerToSchedule(server){
    this.setState({selected: this.state.selected.concat(server)})
  }

  handleHoverPaper (){

  }

  render (){
    return(
      <div>
        <div style={styles.titleText}><span>Generators available: </span></div>
        <div >
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
          <div>
            <div style={styles.titleText}><span>Generators selected: </span></div>
            <Paper
              className="generator-table" 
              zDepth={this.state.borderWidth} 
              onMouseEnter={ e => this.setState({ borderWidth: 1 })} 
              onMouseLeave={ e => this.setState({ borderWidth: 0 })}
            >
              <div>
                <ComingFewDays />
                <SaveIcon style={styles.icon} />
                <DeleteIcon style={styles.icon} />
              </div>
              <br />
              <NcTable generators={this.state.selected} />
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default Scheduler