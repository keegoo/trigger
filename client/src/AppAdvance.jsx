import React from 'react'
import ReactDOM from 'react-dom'
import GeneratorContainer from './components/generator/GeneratorContainer.jsx'
import EditorContainer from './components/editor/EditorContainer.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import injectTapEventPlugin from 'react-tap-event-plugin'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore.js'

const store = configureStore()
injectTapEventPlugin()

class App extends React.Component {
  render(){
    return(
      <div>
        <GeneratorContainer />
        <EditorContainer />
      </div>
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