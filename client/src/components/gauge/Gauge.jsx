import React from 'react'
import TimerIcon from 'material-ui/svg-icons/image/timer'
import UserIcon from 'material-ui/svg-icons/social/group'
import TrendIcon from 'material-ui/svg-icons/action/trending-up'
import ErrorIcon from 'material-ui/svg-icons/alert/error-outline'
import Divider from 'material-ui/Divider'
import { grey400 } from 'material-ui/styles/colors'

const styles = {
  border: {
    boxShadow: `${grey400} 0px 1px 6px`,
    borderRadius: '2px'
  },

  title: {
    padding: '5px'
  },

  body: {
    padding: '5px'
  },

  sublabel: {
    fontSize: '10px',
    marginRight: '5px'
  },

  label: {
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
        return(<div />)
    }
  }

  render() {
    return(
      <div style={styles.border}>
        <div style={styles.title}>{this.props.title}</div>
        <Divider />
        <div style={styles.body}>
          {this.chooseIcon(this.props.type)}
          <div>
            <span style={styles.sublabel}>{this.props.sublabel}</span>
            <span style={styles.label}>{this.props.label}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Gauge