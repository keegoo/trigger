import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { grey300, grey50 } from 'material-ui/styles/colors'
import { Link } from 'react-router'

const styles = {
  title: {
    textDecoration: 'none',
    color: grey50
  },
  
  subtitle: {
    fontSize: '16px',
    paddingLeft: '30px'
  },

  linkEmbedded:{ 
    textDecoration: 'none',
    color: grey300
  },

  menu: {
    marginBottom: '20px'
  }
}

class Menu extends React.Component {
  render() {
    return(
      <div>
      <AppBar style={styles.menu} 
        title=
          {
            <div>
              <Link to="/" style={styles.title}>Trigger</Link>
              <span style={styles.subtitle}> A <a style={styles.linkEmbedded} href="http://gatling.io/">Gatling</a> Controller</span>
            </div>
          }
        showMenuIconButton={false}
        iconElementRight={<FlatButton href="/generator.rb" download>Script</FlatButton>} 
      />
      <div>
        {this.props.children}
      </div>
    </div>
    )
  }
}

export default Menu