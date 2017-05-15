import React from 'react'
import UsersStatusTable from './UsersStatusTable.jsx'
import { cyan500 } from 'material-ui/styles/colors'

const data = [
  {name: 'APC-WGROAPP301', target: 20, running: 20, stopped: 0 },
  {name: 'APC-WGROAPP301', target: 20, running: 19, stopped: 1 },
  {name: 'APC-WGROAPP301', target: 20, running: 19, stopped: 1 },
  {name: 'APC-WGROAPP301', target: 20, running: 16, stopped: 4 }
]

const styles = {
  title: {
    color: cyan500,
    fontSize: '24px',
    margin: '20px 0 10px 0'
  }
}

class UsersContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <div style={styles.title}>User Allocation</div>
        <UsersStatusTable groups={data}/> 
      </div>
    )
  }
}

export default UsersContainer