import React from 'react'
import UserStatusTable from './UserStatusTable.jsx'
import Chart from './Chart.jsx'

const data = [
  {name: 'APC-WGROAPP301', target: 20, running: 20, stopped: 0 },
  {name: 'APC-WGROAPP301', target: 20, running: 19, stopped: 1 },
  {name: 'APC-WGROAPP301', target: 20, running: 19, stopped: 1 },
  {name: 'APC-WGROAPP301', target: 20, running: 16, stopped: 4 }
]

class MonitorContainer extends React.Component {
  render() {
    return (
      <div>
        <UserStatusTable groups={data}/> 
        <Chart />
      </div>
    )
  }
}

export default MonitorContainer