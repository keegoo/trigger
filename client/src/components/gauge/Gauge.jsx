import React from 'react'
import TimerIcon from 'material-ui/svg-icons/image/timer'
import UserIcon from 'material-ui/svg-icons/social/group'
import TrendIcon from 'material-ui/svg-icons/action/trending-up'
import ErrorIcon from 'material-ui/svg-icons/alert/error-outline'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider';

const styles = {
  unit: {
    fontSize: '10px',
    paddingRight: '5px'
  },

  number: {
    fontSize: '30px'
  }
}

class Gauge extends React.Component {

  constructor(props) {
    super(props)
  }

  chooseIcon(type){
    switch(type) {
      case 'users':
        return(<UserIcon />)
      case 'duration':
        return(<TimerIcon />)
      case 'hits':
        return(<TrendIcon />)
      case 'errors':
        return(<ErrorIcon />)
      default: 
        return(``)
    }
  }

  render() {
    return(
      <Paper>
        <div>concurrent users</div>
        <Divider />
        {this.chooseIcon(this.props.type)}
        <div>
          <span style={styles.unit}>No.</span>
          <span style={styles.number}>{this.props.label}</span>
        </div>
      </Paper>
    )
  }
}

export default Gauge