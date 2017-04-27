import React from 'react'
import GeneratorFilter from './GeneratorFilter.jsx'
import GeneratorList from './GeneratorList.jsx'

import Config from 'Config'

class GeneratorContainer extends React.Component {
  constructor (){
    super()

    this.state = {
      filterStr: "",
      generators: []
    }

    this.onFilterChange = this.onFilterChange.bind(this)
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

  render(){
    return(
      <div>
        <GeneratorFilter handleFilterChange={this.onFilterChange} />
        <GeneratorList 
          generators={this.state.generators.filter( e => e.name.includes(this.state.filterStr))}
          filterStr={this.state.filterStr} />
      </div>
    )
  }
}

export default GeneratorContainer