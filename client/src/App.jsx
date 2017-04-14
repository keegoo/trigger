import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import Scheduler from './Scheduler.jsx'
import SavedSchedulers from './SavedSchedulers.jsx'

import Config from 'Config'

const styles = {
  width: '60%',
  margin: 'auto',
  subtitle: {
    fontSize: '16px',
    paddingLeft: '30px'
  }
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
    const host = Config.host
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
          <AppBar 
            title={<div>
                <span>Trigger</span>
                <span style={styles.subtitle}> A Gatling Controller</span>
              </div>}
            showMenuIconButton={false}
            iconElementRight={<FlatButton href="/generator.rb" download>Script</FlatButton>}/>
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