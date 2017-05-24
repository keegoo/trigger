import React from 'react'
import PropTypes from 'prop-types'
import TimerIcon from 'material-ui/svg-icons/image/timer'
import UserIcon from 'material-ui/svg-icons/social/group'
import TrendIcon from 'material-ui/svg-icons/action/trending-up'
import ErrorIcon from 'material-ui/svg-icons/alert/error-outline'
import Divider from 'material-ui/Divider'
import { grey400, grey500, red500 } from 'material-ui/styles/colors'

const black = '#000000'

const styles = {
  border: {
    boxShadow: `${grey400} 0px 0px 5px`,
    borderRadius: '2px'
  },

  title: {
    padding: '5px',
    textAlign: 'center',
    color: grey500,
    fontSize: '12px'
  },

  body: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    height: '60px'
  },

  icon: {
    color: grey500,
    marginTop: '15px'
  },

  textArea: {
    marginTop: '10px'
  },

  sublabel: {
    fontSize: '10px',
    marginRight: '5px'
  },

  label: {
    fontSize: '30px',
    color: black
  },

  // labelColor: {
  //   color: red500
  // }
}

class Gauge extends React.Component {

  constructor(props) {
    super(props)
  }

  chooseIcon(type){
    switch(type) {
      case 'users':
        return(<UserIcon style={styles.icon} />)
      case 'duration':
        return(<TimerIcon style={styles.icon} />)
      case 'hits':
        return(<TrendIcon style={styles.icon} />)
      case 'errors':
        return(<ErrorIcon style={styles.icon} />)
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
          {this.chooseIcon(this.props.iconType)}
          <div style={styles.textArea}>
            <span style={styles.sublabel}>{this.props.sublabel}</span>
            <span style={styles.label}>{this.props.label}</span>
          </div>
        </div>
      </div>
    )
  }
}

Gauge.propTypes = {
  title:      PropTypes.string.isRequired,
  iconType:   PropTypes.string.isRequired,
  sublabel:   PropTypes.string.isRequired,
  label:      PropTypes.string.isRequired
}

export default Gauge