import React from 'react'
import UsersStatusTable from './UsersStatusTable.jsx'

const data = [
  {name: 'APC-WGROAPP301', target: 20, running: 20, stopped: 0 },
  {name: 'APC-WGROAPP301', target: 20, running: 19, stopped: 1 },
  {name: 'APC-WGROAPP301', target: 20, running: 19, stopped: 1 },
  {name: 'APC-WGROAPP301', target: 20, running: 16, stopped: 4 }
]

class UsersContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <UsersStatusTable groups={data}/> 
    )
  }
}

export default UsersContainer