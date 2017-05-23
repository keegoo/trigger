import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GeneratorFilter from './GeneratorFilter.jsx'
import GeneratorList from './GeneratorList.jsx'
import * as utils from './../utils.js'

import Config from 'Config'

class GeneratorContainer extends React.Component {
  constructor ( props, context ){
    super(props, context)

    this.state = {
      filterStr: ""
    }

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onSelectGenerator = this.onSelectGenerator.bind(this)
  }

  onFilterChange(event){
    this.setState({
      filterStr: event.target.value.toUpperCase()
    })
  }

  onSelectGenerator(generator){
    if(this.props.generatorsSelected.includes(generator.name)) {
      this.props.dispatch({
        type: 'REMOVE_GENERATOR',
        task: {generator: generator.name}
      })
    } else {
      this.props.dispatch({
        type: 'ADD_GENERATOR',
        task: {generator: generator.name}
      })
    }
  }

  // active within 6 seconds will be regarded as online
  isOnline(timestamp) {
    return utils.xSecondsAgoUTC(6) < timestamp ? true : false
  }

  timestampIntoStatus(generators){
    return generators.map((x) => { 
      return {
        name: x.name, 
        online: this.isOnline(x.timestamp)
      } 
    // put online ahead
    }).sort((x, y) => y.online - x.online)
  }

  render(){
    // console.log(`prop -> generatorsSelected: ${this.props.generatorsSelected}`)
    return(
      <div>
        <GeneratorFilter 
          handleFilterChange={this.onFilterChange} />
        <GeneratorList 
          generators={this.timestampIntoStatus(this.props.generators).filter( e => e.name.includes(this.state.filterStr))}
          filterStr={this.state.filterStr}
          handleSelectGenerator={this.onSelectGenerator}
          generatorsSelected={this.props.generatorsSelected} />
      </div>
    )
  }
}

GeneratorContainer.propTypes = {
  generators:         PropTypes.array.isRequired,
  generatorsSelected: PropTypes.array.isRequired
}

// todo: what is ??? ownProps ???
function mapStateToProps(state, ownProps) {
  return {
    generatorsSelected: state.tasks.map((x) => x.generator)
  }
}

export default connect(mapStateToProps)(GeneratorContainer)