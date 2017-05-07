import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Router, Route, browserHistory, hashHistory } from 'react-router'

import GeneratorContainer from './components/generator/GeneratorContainer.jsx'
import EditorContainer from './components/editor/EditorContainer.jsx'
import Menu from './components/menu/Menu.jsx'
import ScheduleContainer from './components/schedule/ScheduleContainer.jsx'
import Notification from './components/notification/Notification.jsx'

import MonitorContainer from './components/monitor/MonitorContainer.jsx'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()


import Config from 'Config'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore.js'

const store = configureStore()

const styles = {
  width: '60%',
  margin: 'auto',
  minWidth: '800px'
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
      <div>
        <Menu />
        <div className="app-body" style={styles}>
          <GeneratorContainer />
          <EditorContainer onSave={this.handleSchedulerSave}/>
          <ScheduleContainer schedulers={this.state.savedSchedulersData}/>
          <Notification />
        </div>
      </div>
    )
  }
}

ReactDOM.render((
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="monitor" component={MonitorContainer} />
      </Router>
    </Provider>
  </MuiThemeProvider>),
  document.getElementById("main")
)