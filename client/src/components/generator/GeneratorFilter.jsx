import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import {cyan500} from 'material-ui/styles/colors'

const styles = {
  title: {
    fontSize: '24px',
    color: cyan500,
    marginBottom: '10px',
    marginTop: '20px'
  },
  filter: {
    width: '200px'
  }
}

class GeneratorFilter extends React.Component {
  render () {
    return(
      <div style={styles.title}>
        <span>Generators: </span>
        <TextField 
          style={styles.filter}
          // onChange={ e => this.setState({ filterStr: e.target.value.toUpperCase() })}
          onChange = {this.props.handleFilterChange}
          hintText="Filter" />
      </div>
    )
  }
}

GeneratorFilter.propTypes = {
  handleFilterChange:   PropTypes.func.isRequired
}

export default GeneratorFilter