import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Scheduler from './Scheduler.jsx'
import SavedSchedulers from './SavedSchedulers.jsx'

const styles = {
  width: '60%',
  margin: 'auto'
}

class App extends React.Component {

  constructor(){
    super()

    this.handleSchedulerSave = this.handleSchedulerSave.bind(this)
    this.fetchHistoricalSchedulers = this.fetchHistoricalSchedulers.bind(this)

    this.state = {
      savedSchedulersData: []
    }
  }

  componentDidMount(){
    this.fetchHistoricalSchedulers()
  }

  // =============================
  // savedSchedulers component
  fetchHistoricalSchedulers(){
    const host = "http://127.0.0.1:3000"
    fetch(`${host}/schedulers`)
      .then(response => response.json())
      .then(json => { 
        this.setState({savedSchedulersData: json})
      })
  }
  // =============================

  // =============================
  // scheduler component
  handleSchedulerSave (){
    this.fetchHistoricalSchedulers()
  }
  // =============================

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Trigger" />
          <div className="app-body" style={styles}>
            <Scheduler onSave={this.handleSchedulerSave}/>
            <SavedSchedulers schedulers={this.state.savedSchedulersData}/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
 
ReactDOM.render(<App />, document.getElementById("main"))