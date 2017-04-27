import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import GeneratorFilter from './GeneratorFilter.jsx'
import GeneratorList from './GeneratorList.jsx'

import Config from 'Config'

class GeneratorContainer extends React.Component {
  constructor ( props, context ){
    super(props, context)

    this.state = {
      filterStr: "",
      generators: []
    }

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onSelectGenerator = this.onSelectGenerator.bind(this)
  }

  componentDidMount(){
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
    this.props.dispatch({
      type: 'ADD_GENERATOR',
      generator: generator.name
    })
  }

  render(){
    console.log(`prop -> generatorsSelected: ${this.props.generatorsSelected}`)
    return(
      <div>
        <GeneratorFilter 
          handleFilterChange={this.onFilterChange} />
        <GeneratorList 
          generators={this.state.generators.filter( e => e.name.includes(this.state.filterStr))}
          filterStr={this.state.filterStr}
          handleSelectGenerator={this.onSelectGenerator} />
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
    generatorsSelected: state
  }
}

export default connect(mapStateToProps)(GeneratorContainer)