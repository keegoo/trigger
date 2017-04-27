import React from 'react'
import ReactDOM from 'react-dom'
import GeneratorContainer from './components/generator/GeneratorContainer.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends React.Component {
  render(){
    return(
      <GeneratorContainer />
    )
  }
}

ReactDOM.render((
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>),
  document.getElementById("main")
)