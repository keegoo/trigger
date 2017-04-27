import React from 'react'
import ReactDOM from 'react-dom'
import GeneratorContainer from './components/generator/GeneratorContainer.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore.js'

const store = configureStore()

class App extends React.Component {
  render(){
    return(
      <GeneratorContainer />
    )
  }
}

ReactDOM.render((
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>),
  document.getElementById("main")
)