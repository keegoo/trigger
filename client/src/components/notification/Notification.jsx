import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { orange400, lime400 } from 'material-ui/styles/colors'

const styles = {
  error: {
    backgroundColor: orange400
  },
  info: {
    backgroundColor: lime400
  }
}

class Notification extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleRequestClose() {
    this.props.dispatch({
      type: 'POP_NOTIFICATION'
    })
  }

  notificationType() {
    if (this.props.notification.length == 0) {
      return styles.info
    } else {
      const ntype = this.props.notification[0].type
      switch(ntype) {
        case 'info':
          return styles.info
        case 'error':
          return styles.error
        default:
          console.log(`You may have wrong notification type: ${ntype}`)
      }   
    }
  }

  render() {
    return(
      <div>
        <Snackbar
          bodyStyle={ this.notificationType() }
          open={ this.props.notification.length == 0 ? false : true }
          message= { this.props.notification.length == 0 ? 'default message' : this.props.notification[0].msg }
          autoHideDuration={ 4000 }
          onRequestClose={this.handleRequestClose} />
      </div>
    )
  }
}

function mapStoreToProps(state, ownProps) {
  return {
    notification: state.notification
  }
}

export default connect(mapStoreToProps)(Notification)