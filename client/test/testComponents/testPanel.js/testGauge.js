import React from 'react'
import Gauge from 'srcDir/components/panel/Gauge.jsx'
import { expect } from 'chai'
import { shallow } from 'enzyme'

describe('<Gauge />', () => {
  const wrapper = shallow(<Gauge />)
  it('pass', () => {
    expect([1]).to.deep.equal([1])
  })
})