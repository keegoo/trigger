import React from 'react'
import LinearProgress from 'material-ui/LinearProgress'

const styles = {
  outer: {
    width: '60%',
    padding: '30px',
    height: '120px',
    margin: 'auto'
  },

  innerLine: {
    top: '50%'
  }
}

class Loading extends React.Component {
  render() {
    return(
      <div style={styles.outer}>
        <LinearProgress style={styles.innerLine} mode="indeterminate" />
      </div>
    )
  }
}

export default Loading