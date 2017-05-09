import React from 'react'

const styles = {
  layout: {
    margin: '10px'
  },

  title: {
    fontSize: '24px',
    marginRight: '10px'
  },

  sub: {
    fontSize: '16px'
  }
}

class Heading extends React.Component {
  constructor(props) {
    super(props)
  }

  statusToString(status) {
    switch(status){
      case 'running':
        return 'is running'
      case 'finished':
        return 'is finished'
      case 'waiting':
        return 'is waiting'
    }
  }

  render() {
    return(
      <div style={styles.layout} >
        <span style={styles.title}>Schedule: {this.props.title}</span>
        <span style={styles.sub}>{this.statusToString(this.props.status)}</span>
      </div>
    )
  }
}

export default Heading