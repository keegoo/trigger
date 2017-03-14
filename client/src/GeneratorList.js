import React from 'react'
import Chip from 'material-ui/Chip'

class GeneratorList extends React.Component {
  constructor (){
    super()
    this.styles = {
      chip: {
        margin: '4px'
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      }
    }
  }

  highlightServer(str){
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

  toHtmlTag(server, index) {
    return(
      <Chip key={index} 
        style={this.styles.chip}
        onClick={() => {this.props.handleClick(server)}}
        ><div dangerouslySetInnerHTML={{__html: this.highlightServer(server.name)}}></div></Chip>
    )
  }

  render() {
    return(
      <div style={this.styles.wrapper} >
        {this.props.generators.map((s, i) => this.toHtmlTag(s, i))}
      </div>
    )
  }
}

export default GeneratorList