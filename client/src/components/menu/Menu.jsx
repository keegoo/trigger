import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import {grey200} from 'material-ui/styles/colors'

const styles = {
  subtitle: {
    fontSize: '16px',
    paddingLeft: '30px',
    color: grey200
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
              <span style={styles.subtitle}> A Gatling Controller</span>
            </div>
          }
        showMenuIconButton={false}
        iconElementRight={<FlatButton href="/generator.rb" download>Script</FlatButton>} 
      />
    )
  }
}

export default Menu