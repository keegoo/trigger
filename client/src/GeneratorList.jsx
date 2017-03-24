import React from 'react'
import Chip from 'material-ui/Chip'

import {cyan100} from 'material-ui/styles/colors'

class GeneratorList extends React.Component {
  constructor (props){
    super(props)

    this.styles = {
      chipSelect: {
        margin: '4px',
        // border: 'solid 1px',
        border: 'solid 1px',
        borderColor: cyan100,
        boxSizing: 'border-box'
      },
      chipUnselect: {
        margin: '4px'
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      }
    }
  }

  handleGeneratorClick(generator){
    this.props.handleClick(generator)
  }

  highlightGenerator(str){
    if(this.props.filterStr == "") {
      return str
    } else {
      let re = new RegExp(this.props.filterStr, "g")
      return str.replace(re, this.wrapWithSpan(this.props.filterStr))
    }
  }

  wrapWithSpan(str) {
    return `<span style='font-weight:bold;'>${str}</span>`
  }

  toHtmlTag(generator, index) {
    return(
      <Chip 
        key={index} 
        style={ this.props.generatorsSelected.includes(generator.name) ? this.styles.chipSelect : this.styles.chipUnselect }
        onClick={this.handleGeneratorClick.bind(this, generator)} >
        <div dangerouslySetInnerHTML={{__html: this.highlightGenerator(generator.name)}}></div>
      </Chip>
    )
  }

  render() {
    return(
      <div style={this.styles.wrapper} >
        {this.props.generatorsFiltered.map((s, i) => this.toHtmlTag(s, i))}
      </div>
    )
  }
}

export default GeneratorList