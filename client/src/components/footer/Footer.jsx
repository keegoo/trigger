import React from 'react'
import { grey300 } from 'material-ui/styles/colors'

const styles = {
  footer: {
    marginTop: '40px',
    borderTop: `1px solid ${grey300}`
  }
}

class Footer extends React.Component {
  render() {
    return(
      <div style={styles.footer} />
    )
  }
}

export default Footer