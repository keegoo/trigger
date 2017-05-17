import React from 'react'
import { cyan500, grey300 } from 'material-ui/styles/colors'

const styles = {
  layout: {
    margin: '10px 10px 10px 0'
  },

  title: {
    fontSize: '24px',
    marginRight: '10px',
    color: cyan500
  },

  sub: {
    fontSize: '16px',
    background: grey300,
    borderRadius: '2px'
  }
}

class Heading extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div style={styles.layout} >
        <span style={styles.title}>Schedule {this.props.title}</span>
        <span style={styles.sub}>{`is ${this.props.status}`}</span>
      </div>
    )
  }
}

export default Heading