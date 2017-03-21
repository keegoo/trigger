import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Scheduler from './Scheduler.jsx'
import HistoricalSchedule from './HistoricalSchedule.jsx'

const styles = {
  width: '60%',
  margin: 'auto'
}

class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Trigger" />
          <div className="app-body" style={styles}>
            <Scheduler />
            <br />
            <HistoricalSchedule />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
 
ReactDOM.render(<App />, document.getElementById("main"))