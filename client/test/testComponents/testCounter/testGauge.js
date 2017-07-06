import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import UserIcon from 'material-ui/svg-icons/social/group'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'

import Gauge from 'srcDir/components/counter/Gauge.jsx'

describe('<Gauge />', () => {
  it('accept props of title, icon, unit and label as required', () => {
    const wrapper = shallow(
      <Gauge 
        title='users'
        icon={UserIcon}
        unit='No.'
        label='1000'
        />)
    expect(wrapper.find('div div').at(0).text()).to.contain('users')
    expect(wrapper.find('div div div span').at(0).text()).to.contain('No.')
    expect(wrapper.find('div div div span').at(1).text()).to.contain('1000')
    expect(wrapper.find(UserIcon)).to.have.length(1)
  })

  it('should render title, unit and label with default value if props not set', () => {
    const wrapper = shallow(
      <Gauge />
    )
    expect(wrapper.find('div div').at(0).text()).to.contain('Title')
    expect(wrapper.find('div div div span').at(0).text()).to.contain('Unit.')
    expect(wrapper.find('div div div span').at(1).text()).to.contain('Label')
  })

  it('should render icon with default value if icon not set', () => {
    const wrapper = shallow(
      <Gauge />
    )
    expect(wrapper.find(HelpIcon)).to.have.length(1)
  })

  it('should render label with labelColor provided', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <Gauge labelColor='#EEEEEE'/>
      </MuiThemeProvider>
    )
    expect(wrapper.find(Gauge).get(0).props.labelColor).to.equal('#EEEEEE')
  })
})
