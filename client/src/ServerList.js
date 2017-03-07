import React from 'react'
import Chip from 'material-ui/Chip'

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
      }
    }
  }

  toHtmlTag(server) {
    return(
      <Chip 
        style={this.styles.chip}
        onClick={() => {this.props.handleClick(server.name)}}
        >{server.name}</Chip>
    )
  }

  render() {
    return(
      <div style={this.styles.wrapper} >
        {this.props.servers.map((s) => this.toHtmlTag(s))}
      </div>
    )
  }
}

export default ServerList