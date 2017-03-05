import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import ServerList from './ServerList.js'
import TextField from 'material-ui/TextField'

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
        {id: 5, name: "SF1-WGGenerator5"},
        {id: 6, name: "SF1-WGGenerator6"},
        {id: 7, name: "SF1-WGGenerator7"},
        {id: 8, name: "SF1-WGGenerator8"}
      ],
      filterStr: ""
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Trigger" />
          <div className="searchable-list" style={styles}>
            <span>Generators available: </span>
            <TextField 
              onChange={ e => this.setState({ filterStr: e.target.value })}
              hintText="Filter" />
            <br />
            <ServerList servers={this.state.servers.filter( e => e.name.includes(this.state.filterStr))}/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
 
ReactDOM.render(<App />, document.getElementById("main"))
