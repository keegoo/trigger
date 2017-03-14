import React from 'react'
import Chip from 'material-ui/Chip'

// import {blue300, indigo900} from 'material-ui/styles/colors'

class ServerList extends React.Component {
  constructor (){
    super()
    this.styles = {
      chip: {
        margin: '4'
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      highlight: {
        color: 'darkolivegreen',
        fontWeight: 'bold'
      }
    }
  }

  highlightServer(str){
    if(this.props.filterStr == "") {
      console.log(str)
      return str
    } else {
      let re = new RegExp(this.props.filterStr, "g")
      console.log()
      return str.replace(re, this.wrapWithSpan(this.props.filterStr))
    }
  }

  wrapWithSpan(str) {
    return `<span style='color:darkolivegreen;font-weight:bold;'>${str}</span>`
  }

  toHtmlTag(server) {
    return(
      <Chip 
        style={this.styles.chip}
        onClick={() => {this.props.handleClick(server)}}
        ><div dangerouslySetInnerHTML={{__html: this.highlightServer(server.name)}}></div></Chip>
    )
  }

  render() {
    return(
      <div style={this.styles.wrapper} >
        {this.props.generators.map((s) => this.toHtmlTag(s))}
      </div>
    )
  }
}

export default ServerList