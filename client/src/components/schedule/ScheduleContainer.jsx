import React from 'react'
import PropTypes from 'prop-types'
import Schedule from './Schedule.jsx'
import Pagination from './Pagination.jsx'
import {cyan500} from 'material-ui/styles/colors'
import * as utils from './../utils.js'

const styles = {
  titleText: {
    fontSize: '24px',
    color: cyan500,
    marginBottom: '10px',
    marginTop: '20px'
  }
}

class ScheduleContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentPage: 1,
      itemsEachPage: 4,
      leftBoundary: true,
      rightBoundary: false,
    }

    this.handlePreviousPage = this.handlePreviousPage.bind(this)
    this.handleNextPage = this.handleNextPage.bind(this)
  }  

  currentPageSchedules(){
    // console.log(`this props: <schedulers> ${this.props.schedulers[0]}`)
    const sBegin = (this.state.currentPage - 1) * this.state.itemsEachPage
    const sEnd = sBegin + this.state.itemsEachPage
    return this.props.schedulers.slice(sBegin, sEnd)
  }

  getTotalPages(){
    return Math.ceil(this.props.schedulers.length / this.state.itemsEachPage)
  }

  isScheduleRunning(schedule) {
    return schedule.tasks.map((x) => x.status).includes('running') ? true : false
  }

  handlePreviousPage(){
    this.setState({currentPage: this.state.currentPage - 1})
  }

  handleNextPage(){
    this.setState({currentPage: this.state.currentPage + 1})
  }

  render() {
    return(
      <div>
        <div style={styles.titleText}><span>Saved Schedules</span></div>
        <div>
          {
            this.currentPageSchedules().map((schedule, index) => {
              return <Schedule 
                schedule={schedule} 
                key={index}
                isRunning={this.isScheduleRunning(schedule)} />
            })
          }
        </div>
        <Pagination
          leftBorder={this.state.currentPage == 1 ? true : false}
          rightBorder={[this.state.currentPage, 0].includes(this.getTotalPages()) ? true : false}
          handlePreviousPage={this.handlePreviousPage}
          handleNextPage={this.handleNextPage} />
      </div>
    )
  }
}

ScheduleContainer.propTypes = {
  schedulers:   PropTypes.array.isRequired
}

export default ScheduleContainer