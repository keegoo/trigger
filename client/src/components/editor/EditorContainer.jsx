import React from 'react'
import { connect } from 'react-redux'
import SaveIcon from 'material-ui/svg-icons/content/save'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import DatePicker from './DatePicker.jsx'
import Editor from './Editor.jsx'
import * as utils from './../utils.js'
import {cyan500} from 'material-ui/styles/colors'
import Config from 'Config'

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

class EditorContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      dateOffset: 0
    }

    this.handleDateChange = this.handleDateChange.bind(this)
    this.setSchedulerData = this.setSchedulerData.bind(this)
    this.handleSaveGeneratorTime = this.handleSaveGeneratorTime.bind(this)
    this.handleSaveGeneratorCMD = this.handleSaveGeneratorCMD.bind(this)
    this.handleOnSaveScheduler = this.handleOnSaveScheduler.bind(this)
  }

  handleDateChange (event, index, value){
    this.setState({dateOffset: value})
  }

  handleSaveGeneratorTime(generator, value) {
    const date = utils.dateStartFromToday(this.state.dateOffset)
    this.setSchedulerData(generator, {time: utils.combineDateTimeToISO(date, value + ':00')})
  }

  handleSaveGeneratorCMD(generator, value) {
    this.setSchedulerData(generator, {cmd: value})
  }

  setSchedulerData(generator, {time, cmd}) {
    if(time){
      this.props.dispatch({
        type: 'SAVE_TIME',
        schedule: { generator: generator, time: time}
      })
    } 

    if(cmd){
      this.props.dispatch({
        type: 'SAVE_COMMAND',
        schedule: { generator: generator, cmd: cmd}
      })
    }
  }

  handleOnSaveScheduler(){
    console.log("click save button")
    if (this.props.schedule.length == 0){
      console.log(`save schedule failed!`)
    } else {
      this.saveScheduler()
    }
  }

  saveScheduler(){
    const host = Config.host
    const x = {
      // date: utils.dateStartFromToday(this.state.dateOffset),
      schedule: this.props.schedule
    }

    fetch(`${host}/schedulers`, {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify(x)
    }).then(response => response.json())
    .then(json => {
      console.log('schedule is saved: ')
      console.log(json)

      // tell its father: App
      this.props.onSave()

      // clear schedule
      this.props.dispatch({
        type: 'SCHEDULE_BEEN_SAVED',
        schedule: {}
      })

      // reset dateOffset
      this.setState({dateOffset: 0})
    })
  }

  render() {
    return(
      <div>
        <div style={styles.titleText}><span>Schedule</span></div>
        <div>
          <DatePicker
            value={this.state.dateOffset}
            handleDateChange={this.handleDateChange} />
          <DeleteIcon 
            style={styles.deleteIcon} 
            hoverColor={cyan500} 
            onClick={ this.handleOnSaveScheduler }/>
          <SaveIcon 
            style={styles.saveIcon} 
            hoverColor={cyan500}
            onClick={ this.handleOnSaveScheduler } />
        </div>
        <Editor 
          generatorsSelected={this.props.schedule.map((x) => x.generator).sort()}
          saveTime={this.handleSaveGeneratorTime}
          saveCMD={this.handleSaveGeneratorCMD} />
      </div>
    )
  }
}

// todo: what is ??? ownProps ???
function mapStateToProps(state, ownProps) {
  return {
    schedule: state.schedule
  }
}

export default connect(mapStateToProps)(EditorContainer)