import React from 'react'
import HsTable from './HsTable.js'

// navigate icon
import NavigateBeforeIcon from 'material-ui/svg-icons/image/navigate-before'
import NavigateNextIcon from 'material-ui/svg-icons/image/navigate-next'


class HistorialSchedule extends React.Component {
  constructor(){
    super()
    this.state = {
      historials: [
        {
          date: "13-03-2017",
          items: [
            { generator: "APC-WGROAPP301", time: "15:31", module: "ping 127.0.0.1 -t", status: "success"},
            { generator: "APC-WGROAPP302", time: "15:31", module: "ping 127.0.0.1 -t", status: "success"},
            { generator: "APC-WGROAPP303", time: "15:31", module: "ping 127.0.0.1 -t", status: "success"},
            { generator: "APC-WGROAPP304", time: "15:31", module: "ping 127.0.0.1 -t", status: "success"},
            { generator: "APC-WGROAPP305", time: "15:31", module: "ping 127.0.0.1 -t", status: "success"}
          ]
        },
        {
          date: "12-03-2017",
          items: [
            { generator: "SF1-WGROAPP301", time: "1:15", module: "gatling -t", status: "success"},
            { generator: "SF1-WGROAPP301", time: "1:15", module: "gatling -t", status: "success"},
            { generator: "SF1-WGROAPP301", time: "1:15", module: "gatling -t", status: "success"},
            { generator: "SF1-WGROAPP301", time: "1:15", module: "gatling -t", status: "success"},
            { generator: "SF1-WGROAPP301", time: "1:15", module: "gatling -t", status: "success"},
          ]
        }

        // ...
      ]
    }
  }

  render(){
    return(
      <div>
        <div><span>Historial Records: </span></div>
        {
          this.state.historials.map((t) => {
            return <HsTable historialInfo={t} />
          })
        }
        <div>
          <NavigateBeforeIcon />
          <NavigateNextIcon />
        </div>
      </div>
    )
  }
}

export default HistorialSchedule