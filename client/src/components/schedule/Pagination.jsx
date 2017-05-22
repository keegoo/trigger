import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import NavigateBeforeIcon from 'material-ui/svg-icons/image/navigate-before'
import NavigateNextIcon from 'material-ui/svg-icons/image/navigate-next'

const styles = {
  navigateBtn: {
    textAlign: 'center'
  }
}

class Pagination extends React.Component {
  render (){
    return(
      <div style={styles.navigateBtn}>
        <IconButton 
          disabled={ this.props.leftBorder } 
          onClick={ this.props.handlePreviousPage }>
          <NavigateBeforeIcon/>
        </IconButton>
        <IconButton 
          disabled={ this.props.rightBorder } 
          onClick={ this.props.handleNextPage }>
          <NavigateNextIcon/>
        </IconButton>
      </div>
    )
  }
}

Pagination.propTypes = {
  leftBorder:         PropTypes.bool.isRequired,
  rightBorder:        PropTypes.bool.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  handleNextPage:     PropTypes.func.isRequired
}

export default Pagination