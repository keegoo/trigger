import React from 'react'
import GeneratorContainer from './components/generator/GeneratorContainer.jsx'
import EditorContainer from './components/editor/EditorContainer.jsx'
import ScheduleContainer from './components/schedule/ScheduleContainer.jsx'
import Notification from './components/notification/Notification.jsx'
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
    this.fetchHistoricalSchedulers = this.fetchHistoricalSchedulers.bind(this)

    this.state = {

      // =============================
      // exmpale:
      // {
      //   "tasks":[
      //     {"generator":"SF1-WGROAPP311","time":"2017-05-22T08:00:00Z","cmd":"ping www.google.com -c 30","status":""},
      //     {"generator":"SF1-WGROAPP310","time":"2017-05-22T08:00:00Z","cmd":"ping www.google.com -c 30","status":""}
      //    ]
      // }
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
        // console.log(json)
      })
  }

  handleSchedulerSave (){
    this.fetchHistoricalSchedulers()
  }

  render() {
    return (
      <div style={styles}>
        <GeneratorContainer />
        <EditorContainer onSave={this.handleSchedulerSave}/>
        <ScheduleContainer schedulers={this.state.savedSchedulersData}/>
        <Notification />
      </div>
    )
  }
}

export default HomePage