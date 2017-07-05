import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import UserIcon from 'material-ui/svg-icons/social/group'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Gauge from 'srcDir/components/panel/Gauge.jsx'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'

describe('<Gauge />', () => {
  it('pass', () => {
    expect([1]).to.deep.equal([1])
  })

  it('accept props of title, unit and label as required', () => {
    const wrapper = shallow(
      <Gauge 
        title='users'
        iconType='users'
        unit='No.'
        label='1000'
        />)
    expect(wrapper.find('div div').at(0).text()).to.contain('users')
    expect(wrapper.find('div div div span').at(0).text()).to.contain('No.')
    expect(wrapper.find('div div div span').at(1).text()).to.contain('1000')
  })

  it('accept props of iconType as one of users/duration/hits/errors/default', () => {
    const wrapper = shallow(
      <Gauge iconType='users'/>
    )
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
