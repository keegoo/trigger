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
    if(this.props.generatorsSelected.includes(generator.name)) {
      this.props.dispatch({
        type: 'REMOVE_GENERATOR',
        schedule: {generator: generator.name}
      })
    } else {
      this.props.dispatch({
        type: 'ADD_GENERATOR',
        schedule: {generator: generator.name}
      })
    }
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
    generatorsSelected: state.schedule.map((x) => x.generator)
  }
}

export default connect(mapStateToProps)(GeneratorContainer)