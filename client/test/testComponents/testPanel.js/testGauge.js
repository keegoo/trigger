import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import UserIcon from 'material-ui/svg-icons/social/group'

import Gauge from 'srcDir/components/panel/Gauge.jsx'

describe('<Gauge />', () => {
  it('pass', () => {
    expect([1]).to.deep.equal([1])
  })

  it('accept props of title, unit, label as required', () => {
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
  it('accept props of iconType as one of users/duration/hits/errors', () => {
    const wrapper = shallow(
      <Gauge iconType='users'/>
    )
    expect(wrapper.find(UserIcon)).to.have.length(1)
  })
})
