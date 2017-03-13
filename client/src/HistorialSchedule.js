import React from 'react'
import HsTable from './HsTable.js'
import IconButton from 'material-ui/IconButton'

// navigate icon
import NavigateBeforeIcon from 'material-ui/svg-icons/image/navigate-before'
import NavigateNextIcon from 'material-ui/svg-icons/image/navigate-next'


class HistorialSchedule extends React.Component {
  constructor(){
    super()
    this.state = {
      currentPage: 1,
      itemsEachPage: 2,
      leftBoundary: true,
      rightBoundary: false,
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
        },
        {
          date: "11-03-2017",
          items: [
            { generator: "APC-WGROAPP301", time: "15:31", module: "ping 127.0.0.1 -t", status: "success"},
            { generator: "APC-WGROAPP302", time: "15:31", module: "ping 127.0.0.1 -t", status: "success"},
            { generator: "APC-WGROAPP303", time: "15:31", module: "ping 127.0.0.1 -t", status: "success"},
            { generator: "APC-WGROAPP304", time: "15:31", module: "ping 127.0.0.1 -t", status: "success"},
            { generator: "APC-WGROAPP305", time: "15:31", module: "ping 127.0.0.1 -t", status: "success"}
          ]
        },
        {
          date: "10-03-2017",
          items: [
            { generator: "SF1-WGROAPP301", time: "1:15", module: "gatling -t", status: "success"},
            { generator: "SF1-WGROAPP301", time: "1:15", module: "gatling -t", status: "success"},
            { generator: "SF1-WGROAPP301", time: "1:15", module: "gatling -t", status: "success"},
            { generator: "SF1-WGROAPP301", time: "1:15", module: "gatling -t", status: "success"},
            { generator: "SF1-WGROAPP301", time: "1:15", module: "gatling -t", status: "success"},
          ]
        }

        // ....
      ]
    }
  }

  currentPageItems(){
    const sBegin = (this.state.currentPage - 1) * this.state.itemsEachPage
    const sEnd = sBegin + this.state.itemsEachPage
    return this.state.historials.slice(sBegin, sEnd)
  }

  getTotalPages(){
    return Math.ceil(this.state.historials.length / this.state.itemsEachPage)
  }

  render(){
    return(
      <div>
        <div><span>Historial Records: </span></div>
        {
          this.currentPageItems().map((t) => {
            return <HsTable historialInfo={t} />
          })
        }
        <div>
          <IconButton 
            disabled={ this.state.currentPage == 1 ? true : false } 
            onClick={ () => this.setState({currentPage: this.state.currentPage - 1}) }>
            <NavigateBeforeIcon/>
          </IconButton>
          <IconButton 
            disabled={ this.getTotalPages() == this.state.currentPage ? true : false } 
            onClick={ () => this.setState({currentPage: this.state.currentPage + 1}) }>
            <NavigateNextIcon/>
          </IconButton>
        </div>
      </div>
    )
  }
}

export default HistorialSchedule