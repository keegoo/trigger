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
      filterStr: "",

      // data example:
      // [{ name: "SF2-WGROAPP301", timestamp: "2017-05-05T13:24:32Z" }, ...]
      generators: []
    }

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onSelectGenerator = this.onSelectGenerator.bind(this)
    this.fetchGenerators = this.fetchGenerators.bind(this)
  }

  componentDidMount() {
    this.fetchGenerators()
    this.interval = setInterval(this.fetchGenerators, 6000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  fetchGenerators(){
    const host = Config.host
    fetch(`${host}/generators`)
      .then(response => response.json())
      .then(json => {
        this.setState({generators: json})
      })
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
    return this.state.generators.map((x) => { 
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
          generators={this.timestampIntoStatus(this.state.generators).filter( e => e.name.includes(this.state.filterStr))}
          filterStr={this.state.filterStr}
          handleSelectGenerator={this.onSelectGenerator}
          generatorsSelected={this.props.generatorsSelected} />
      </div>
    )
  }
}

GeneratorContainer.propTypes = {
  generatorsSelected: PropTypes.array.isRequired
}

// todo: what is ??? ownProps ???
function mapStateToProps(state, ownProps) {
  return {
    generatorsSelected: state.tasks.map((x) => x.generator)
  }
}

export default connect(mapStateToProps)(GeneratorContainer)