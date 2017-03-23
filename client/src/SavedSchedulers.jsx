import React from 'react'
import HsTable from './HsTable.jsx'
import IconButton from 'material-ui/IconButton'

// navigate icon
import NavigateBeforeIcon from 'material-ui/svg-icons/image/navigate-before'
import NavigateNextIcon from 'material-ui/svg-icons/image/navigate-next'

import {cyan500} from 'material-ui/styles/colors'

const styles = {
  titleText: {
    fontSize: '24px',
    color: cyan500,
    marginBottom: '10px',
    marginTop: '20px'
  },
  navigateBtn: {
    textAlign: 'center'
  }
}
class SavedSchedulers extends React.Component {
  constructor(){
    super()
    this.state = {
      currentPage: 1,
      itemsEachPage: 2,
      leftBoundary: true,
      rightBoundary: false,
      historicals: []
    }
  }

  componentDidMount(){
    const host = "http://127.0.0.1:3000"
    fetch(`${host}/historical_schedules`)
      .then(response => response.json())
      .then(json => {
        this.setState({historicals: json})
      })
  }

  currentPageItems(){
    const sBegin = (this.state.currentPage - 1) * this.state.itemsEachPage
    const sEnd = sBegin + this.state.itemsEachPage
    return this.state.historicals.slice(sBegin, sEnd)
  }

  getTotalPages(){
    return Math.ceil(this.state.historicals.length / this.state.itemsEachPage)
  }

  render(){
    return(
      <div>
        <div style={styles.titleText}><span>Historical Records: </span></div>
        <div>
          {
            this.currentPageItems().map((t, index) => {
              return <HsTable historicalInfo={t} key={index}/>
            })
          }
          <div style={styles.navigateBtn}>
            <IconButton 
              disabled={ this.state.currentPage == 1 ? true : false } 
              onClick={ () => this.setState({currentPage: this.state.currentPage - 1}) }>
              <NavigateBeforeIcon/>
            </IconButton>
            <IconButton 
              disabled={ this.getTotalPages() == this.state.currentPage ? true : false } 
              onClick={ () => this.setState({currentPage: this.state.currentPage + 1}) }>
              <NavigateNextIcon/>
            </IconButton>
          </div>
        </div>
      </div>
    )
  }
}

export default SavedSchedulers