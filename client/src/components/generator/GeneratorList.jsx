import React, {PropTypes} from 'react'
import Chip from 'material-ui/Chip'
import {cyan100} from 'material-ui/styles/colors'

const styles = {
  chipSelect: {
    margin: '4px',
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

class GeneratorList extends React.Component {

  constructor(props) {
    super(props)
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

  wrapWithChip(generator, index) {
    return(
      <Chip 
        key={index} 
        //style={ this.props.generatorsSelected.includes(generator.name) ? this.styles.chipSelect : this.styles.chipUnselect }
        onClick={this.props.handleSelectGenerator.bind(this, generator)} 
        style={styles.chipSelect}
        >
        <div dangerouslySetInnerHTML={{__html: this.highlightGenerator(generator.name)}}></div>
      </Chip>
    )
  }

  render() {
    return(
      <div style={styles.wrapper} >
        {this.props.generators.map((generator, index) => this.wrapWithChip(generator, index))}
      </div>
    )
  }
}

GeneratorList.propTypes = {
  generators: PropTypes.array.isRequired,
  filterStr: PropTypes.string.isRequired
}

export default GeneratorList