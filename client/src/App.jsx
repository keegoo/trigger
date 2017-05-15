import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './HomePage.jsx'
import MonitorPage from './MonitorPage.jsx'
import MainLayout from './MainLayout.jsx'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()


import { Provider } from 'react-redux'
import configureStore from './store/configureStore.js'

const store = configureStore()


ReactDOM.render((
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route component={MainLayout}>
          <Route path="/" component={HomePage} />
          <Route path="monitor/:scheduleId" component={MonitorPage} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>),
  document.getElementById("main")
)