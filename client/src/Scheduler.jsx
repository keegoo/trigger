import React from 'react'
import GeneratorList from './GeneratorList.jsx'
import TextField from 'material-ui/TextField'
import NcTable from './NcTable.jsx'
import ComingFewDays from './ComingFewDays.jsx'
import Paper from 'material-ui/Paper'

import Dialog from 'material-ui/Dialog'

// save delete icon
import SaveIcon from 'material-ui/svg-icons/content/save'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import {cyan500} from 'material-ui/styles/colors'

// icon float right
const styles = {
  titleText: {
    fontSize: '24px',
    color: cyan500,
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
    this.handleOnSaveScheduler = this.handleOnSaveScheduler.bind(this)

    this.setSchedulerData = this.setSchedulerData.bind(this)
    this.handleSaveGeneratorTime = this.handleSaveGeneratorTime.bind(this)
    this.handleSaveGeneratorCMD = this.handleSaveGeneratorCMD.bind(this)

    this.state = {
      // {name: , status: , last_used: , frequency: }
      generators: [],
      filterStr: "",

      // {generator: , time: , cmd: , status: }
      selected: [],
      paperBorderWidth: 0,
      popupDialog: false
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
    this.setState({
      selected: this.state.selected.concat({name: generator.name, time: "", cmd: ""})
    })
  }

  handleOnSaveScheduler(){
    console.log("click save button")
    if (this.state.selected.length == 0){
      this.setState({popupDialog: !this.state.popupDialog})
    } else {
      this.saveScheduler()
    }
  }

  saveScheduler(){
    console.log(this.state.selected)
  }

  // =============================
  // NcTable component 
  handleSaveGeneratorTime(server, value) {
    this.setSchedulerData(server, {time: value})
  }

  handleSaveGeneratorCMD(server, value) {
    this.setSchedulerData(server, {cmd: value})
  }

  setSchedulerData(generator, {time, cmd}) {
    let b = this.state.selected.filter((x) => x.name == generator)[0]
    if(time) { b.time = time }
    if(cmd)  { b.cmd = cmd }

    let c = this.state.selected.filter((x) => x.name != generator).concat(b)
    this.setState({selected: c})
  }
  // =============================

  render (){
    return(
      <div>
        <div style={styles.titleText}>
          <span>Generators: </span>
          <TextField 
            style={styles.filter}
            onChange={ e => this.setState({ filterStr: e.target.value.toUpperCase() })}
            hintText="Filter" />
        </div>
        <div >
          <GeneratorList 
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
                <DeleteIcon 
                  style={styles.deleteIcon} 
                  hoverColor={cyan500} 
                  onClick={ this.handleOnSaveScheduler }/>
                <SaveIcon 
                  style={styles.saveIcon} 
                  hoverColor={cyan500}
                  onClick={ this.handleOnSaveScheduler } />
              </div>
              <NcTable 
                generators={this.state.selected} 
                saveTime={this.handleSaveGeneratorTime}
                saveCMD={this.handleSaveGeneratorCMD} />
              <Dialog
                onRequestClose={ () =>  this.setState({popupDialog: false}) }
                open={ this.state.popupDialog }
                >You need to select at least one Generator for each Scheduler
              </Dialog>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default Scheduler