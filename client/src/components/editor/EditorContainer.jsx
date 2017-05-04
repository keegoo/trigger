import React from 'react'
import { connect } from 'react-redux'
import SaveIcon from 'material-ui/svg-icons/content/save'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import Paper from 'material-ui/Paper'
import DatePicker from './DatePicker.jsx'
import Editor from './Editor.jsx'
import { NOTIFICATION_RESOURCE } from './../notification/notificationResource.js'
import * as utils from './../utils.js'
import { cyan500 } from 'material-ui/styles/colors'
import Config from 'Config'

const styles = {
  titleText: {
    fontSize: '24px',
    color: cyan500,
    marginBottom: '10px',
    marginTop: '20px'
  },
  saveIcon: {
    float: 'right',
    color: 'gray',
    marginTop: '20px',
    marginRight: '20px'
  },
  filter: {
    width: '200px'
  }
}

class EditorContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      dateOffset: 0,
      paperBorderWidth: 0
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

  // ==================================
  handleOnSaveScheduler(){
    if ( this.noneGeneratorsSelected() ){
      this.props.dispatch({
        type: 'PUSH_NOTIFICATION',
        notification: NOTIFICATION_RESOURCE.ERROR_NO_GENERATOR
      })
    } else if ( this.invalidScheduleElement() ) {
      this.props.dispatch({
        type: 'PUSH_NOTIFICATION',
        notification: NOTIFICATION_RESOURCE.ERROR_INVALID_SCHEDULE
      })
    } else {
      this.saveScheduler()
    }
  }

  noneGeneratorsSelected() {
    return this.props.schedule.length === 0 ? true : false
  }

  invalidScheduleElement() {
    let invalid = false
    this.props.schedule.forEach((x) => {
      if( this.isEmpty(x.generator) || this.isEmpty(x.time) || this.isEmpty(x.cmd) ){
        invalid = true
      }
    })
    return invalid
  }

  isEmpty(str) {
    // falsy: 
    //    null, undefined, NaN, empty str, 0, false
    return str ? false : true
  }
  // ==================================

  saveScheduler(){
    const host = Config.host
    const x = {
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

      // notification
      this.props.dispatch({
        type: 'PUSH_NOTIFICATION',
        notification: NOTIFICATION_RESOURCE.INFO_SAVE_SCHEDULE
      })

      // reset dateOffset
      this.setState({dateOffset: 0})
    })
  }

  render() {
    return(
      <div>
        <div style={styles.titleText}><span>Schedule</span></div>
        <Paper
          zDepth={this.state.paperBorderWidth} 
          onMouseEnter={ e => this.setState({ paperBorderWidth: 1 })} 
          onMouseLeave={ e => this.setState({ paperBorderWidth: 0 })} >
          <div>
            <DatePicker
              value={this.state.dateOffset}
              handleDateChange={this.handleDateChange} />
            <SaveIcon 
              style={styles.saveIcon} 
              hoverColor={cyan500}
              onClick={ this.handleOnSaveScheduler } />
          </div>
          <Editor 
            generatorsSelected={this.props.schedule.map((x) => x.generator).sort()}
            saveTime={this.handleSaveGeneratorTime}
            saveCMD={this.handleSaveGeneratorCMD} />
        </Paper>
      </div>
    )
  }
}

// todo: what is ??? ownProps ???
function mapStateToProps(state, ownProps) {
  return {
    schedule: state.schedule,
    notification: state.notification
  }
}

export default connect(mapStateToProps)(EditorContainer)