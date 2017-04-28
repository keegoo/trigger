import React from 'react'
import { connect } from 'react-redux'
import SaveIcon from 'material-ui/svg-icons/content/save'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import DatePicker from './DatePicker.jsx'
import Editor from './Editor.jsx'
import * as utils from './../utils.js'
import {cyan500} from 'material-ui/styles/colors'

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
  constructor() {
    super()

    this.state = {
      dateOffset: 0,

      // {generator: , time: , cmd: , status: }
      selected: []
    }

    this.handleDateChange = this.handleDateChange.bind(this)
    this.setSchedulerData = this.setSchedulerData.bind(this)
    this.handleSaveGeneratorTime = this.handleSaveGeneratorTime.bind(this)
    this.handleSaveGeneratorCMD = this.handleSaveGeneratorCMD.bind(this)
  }

  handleDateChange (event, index, value){
    this.setState({dateOffset: value})
  }

  handleSaveGeneratorTime(schedule, value) {
    const date = utils.dateStartFromToday(this.state.dateOffset)
    this.setSchedulerData(schedule.generator, {time: utils.combineDateTimeToISO(date, value + ':00')})
  }

  handleSaveGeneratorCMD(schedule, value) {
    this.setSchedulerData(schedule.generator, {cmd: value})
  }

  // setSchedulerData(generator, {time, cmd}) {
  //   let selected = this.state.selected
  //   const index = selected.map((x) => x.generator).indexOf(generator)
  //   if(time) {selected[index].time = time}
  //   if(cmd)  {selected[index].cmd = cmd}

  //   this.setState({selected: selected})
  // }

  setSchedulerData(generator, {time, cmd}) {
    if(time){
      this.props.dispatch({
        type: 'SAVE_TIME',
        schedule: { generator: generator, time: time}
      })
    } 

    if(cmd){
      this.props.dispatch({
        type: 'SAVE_CMD',
        schedule: { generator: generator, cmd: cmd}
      })
    }
  }

  render() {
    return(
      <div>
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
          generatorsSelected={this.props.generatorsSelected}
          saveTime={this.handleSaveGeneratorTime}
          saveCMD={this.handleSaveGeneratorCMD} />
      </div>
    )
  }
}

// todo: what is ??? ownProps ???
function mapStateToProps(state, ownProps) {
  return {
    generatorsSelected: state
  }
}

export default connect(mapStateToProps)(EditorContainer)