import React from 'react'
import UserStatusTable from './UserStatusTable.jsx'

const data = [
  {name: 'APC-WGROAPP301', target: 20, running: 20, stopped: 0 },
  {name: 'APC-WGROAPP301', target: 20, running: 19, stopped: 1 },
  {name: 'APC-WGROAPP301', target: 20, running: 19, stopped: 1 },
  {name: 'APC-WGROAPP301', target: 20, running: 16, stopped: 4 }
]

class MonitorContainer extends React.Component {
  render() {
    return (
      <UserStatusTable groups={data}/> 
    )
  }
}

export default MonitorContainer