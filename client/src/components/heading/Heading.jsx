import React from 'react'

const styles = {
  title: {

  },

  sub: {

  }
}

class Heading extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <h2>{this.props.title}</h2>
        <span>is</span>
      </div>
    )
  }
}

export default Heading