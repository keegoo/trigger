import React from 'react'
import GeneratorContainer from './components/generator/GeneratorContainer.jsx'
import EditorContainer from './components/editor/EditorContainer.jsx'
import ScheduleContainer from './components/schedule/ScheduleContainer.jsx'
import Notification from './components/notification/Notification.jsx'
import Loading from './components/loading/Loading.jsx'
import Config from 'Config'

const styles = {
  width: '60%',
  margin: 'auto',
  minWidth: '800px'
}

class HomePage extends React.Component {

  constructor(props, context){
    super(props, context)

    this.handleSchedulerSave = this.handleSchedulerSave.bind(this)
    this.fetchAll = this.fetchAll.bind(this)
    this.fetchHistoricalSchedulers = this.fetchHistoricalSchedulers.bind(this)
    this.fetchGenerators = this.fetchGenerators.bind(this)

    this.state = {

      // =============================
      // exmpale:
      // {
      //   "tasks":[
      //     {"generator":"SF1-WGROAPP311","time":"2017-05-22T08:00:00Z","cmd":"ping www.google.com -c 30","status":""},
      //     {"generator":"SF1-WGROAPP310","time":"2017-05-22T08:00:00Z","cmd":"ping www.google.com -c 30","status":""}
      //    ]
      // }
      savedSchedulersData: [],

      // data example:
      // [
      //  { 
      //    name: "SF2-WGROAPP301", 
      //    last_used: "2017-05-06T04:52:23Z" 
      //  },
      //  ...
      // ]
      generators: [],

      finishLoadGeneratorComponent: false,
      finishLoadSchedulerComponent: false
    }

    this.fetchHistoricalSchedulers()
    this.fetchGenerators()
  }

  componentDidMount(){
    this.interval = setInterval(this.fetchAll, 6000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  fetchAll() {
    this.fetchGenerators()
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
      .then(json => {
        this.setState({finishLoadSchedulerComponent: true})
      })
  }

  fetchGenerators(){
    const host = Config.host
    fetch(`${host}/generators`)
      .then(response => response.json())
      .then(json => {
        this.setState({generators: json})
      })
      .then(json => {
        this.setState({finishLoadGeneratorComponent: true})
      })
  }

  handleSchedulerSave (){
    this.fetchHistoricalSchedulers()
  }

  render() {
    if (this.state.finishLoadGeneratorComponent && this.state.finishLoadSchedulerComponent) {
      return (
        <div style={styles}>
          <GeneratorContainer generators={this.state.generators} />
          <EditorContainer onSave={this.handleSchedulerSave} />
          <ScheduleContainer schedulers={this.state.savedSchedulersData} />
          <Notification />
        </div>
      )
    } else {
      return(
        <Loading />
      )
    }
  }
}

export default HomePage