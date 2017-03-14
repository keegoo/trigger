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
  deleteIcon: {
    float: 'right',
    color: 'gray',
    marginTop: '20px',
    marginRight: '10px'
  },
  saveIcon: {
    float: 'right',
    color: 'gray',
    marginTop: '20px',
    marginRight: '10px'
  },
  filter: {
    width: '200px'
  }
}

class Scheduler extends React.Component {
  constructor (){
    super()
    this.handleGeneratorClick = this.handleGeneratorClick.bind(this)
    this.state = {
      generators: [],
      filterStr: "",
      selected: [
        {id: 7, name: "SF1-WGGenerator7"},
        {id: 4, name: "APC-WGGenerator4"}
      ],
      paperBorderWidth: 0
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

  handleGeneratorClick(generator){
    let len = this.state.selected.filter((s) => s.name === generator.name).length
    if (len == 1) {
      this.removeGeneratorFromSchedule(generator)
    } else {
      this.addGeneratorToSchedule(generator)
    }
  }

  removeGeneratorFromSchedule(generator){
    let arr = this.state.selected
    this.setState({selected: arr.filter((s) => s.name !== generator.name)})
  }

  addGeneratorToSchedule(generator){
    this.setState({selected: this.state.selected.concat(generator)})
  }

  render (){
    return(
      <div>
        <div style={styles.titleText}>
          <span>Generators available: </span>
          <TextField 
            style={styles.filter}
            onChange={ e => this.setState({ filterStr: e.target.value.toUpperCase() })}
            hintText="Filter" />
        </div>
        <div >
          <ServerList 
            generators={this.state.generators.filter( e => e.name.includes(this.state.filterStr))}
            filterStr={this.state.filterStr}
            handleClick={this.handleGeneratorClick}
            />
          <br />
          <div>
            <div style={styles.titleText}><span>Schedule</span></div>
            <Paper
              className="generator-table" 
              zDepth={this.state.paperBorderWidth} 
              onMouseEnter={ e => this.setState({ paperBorderWidth: 1 })} 
              onMouseLeave={ e => this.setState({ paperBorderWidth: 0 })}
            >
              <div>
                <ComingFewDays />
                <DeleteIcon style={styles.deleteIcon} hoverColor={'rgb(0, 188, 212)'}/>
                <SaveIcon style={styles.saveIcon} hoverColor={'rgb(0, 188, 212)'}/>
              </div>
              <NcTable generators={this.state.selected} />
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default Scheduler