import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'

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

  render() {
    return(
      <div>
        <Snackbar
          open={ this.props.notification.length == 0 ? false : true }
          message= { this.props.notification.length == 0 ? 'default message' : this.props.notification[0].msg }
          autoHideDuration={23000}
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