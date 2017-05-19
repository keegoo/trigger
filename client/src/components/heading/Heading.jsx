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
    borderRadius: '2px',
    display: 'inline',
    padding: '0px 4px 0px 4px'
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
        <div style={styles.sub}>{`is ${this.props.status}`}</div>
      </div>
    )
  }
}

export default Heading