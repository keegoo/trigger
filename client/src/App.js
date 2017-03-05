import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import ServerList from './ServerList.js'

const styles = {
  width: '60%',
  margin: 'auto'
}

class App extends React.Component {
  constructor (){
    super()
    this.state = {
      servers: [
        {id: 1, name: "APC-WGGenerator1"},
        {id: 2, name: "APC-WGGenerator2"},
        {id: 3, name: "APC-WGGenerator3"},
        {id: 4, name: "APC-WGGenerator4"},
        {id: 5, name: "APC-WGGenerator5"},
        {id: 6, name: "APC-WGGenerator6"},
        {id: 7, name: "APC-WGGenerator7"},
        {id: 8, name: "APC-WGGenerator8"}
      ]
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Trigger" />
          <div className="searchable-list" style={styles}>
            <p>Generators available:</p>
            <ServerList servers={this.state.servers}/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
 
ReactDOM.render(<App />, document.getElementById("main"))
