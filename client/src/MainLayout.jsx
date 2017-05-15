import React from 'react'
import Menu from './components/menu/Menu.jsx'
import Footer from './components/footer/Footer.jsx'

class MainLayout extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div>
        <Menu />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default MainLayout