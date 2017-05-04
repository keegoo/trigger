import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import {grey300} from 'material-ui/styles/colors'

const styles = {
  subtitle: {
    fontSize: '16px',
    paddingLeft: '30px'
  },

  linkEmbedded:{ 
    textDecoration: 'none',
    color: grey300
  }
}

class Menu extends React.Component {
  render() {
    return(
      <AppBar 
        title=
          {
            <div>
              <span>Trigger</span>
              <span style={styles.subtitle}> A <a style={styles.linkEmbedded} href="http://gatling.io/">Gatling</a> Controller</span>
            </div>
          }
        showMenuIconButton={false}
        iconElementRight={<FlatButton href="/generator.rb" download>Script</FlatButton>} 
      />
    )
  }
}

export default Menu