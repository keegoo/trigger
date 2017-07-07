import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import counterGaugeHOC from 'srcDir/components/counter/counterGaugeHOC.jsx'
import Gauge from 'srcDir/components/counter/Gauge.jsx'

describe('counterGaugeHOC()', () => {
  const CounterGauge = counterGaugeHOC(Gauge)
  
  it('should return a component', () => {
    const wrapper = shallow(
      <CounterGauge />
    )
    expect(wrapper.find(Gauge)).to.have.length(1)
  })

  it('should format number with commas', () => {
    const wrapper = shallow(
      <CounterGauge counter='123456789' />
    )
    expect(wrapper.find(Gauge).at(0).props().label).to.equal('123,456,789')
  })

  it('should use default value 0 if account not set', () => {
    const wrapper = shallow(
      <CounterGauge />
    )
    expect(wrapper.find(Gauge).at(0).props().label).to.equal('0')
  })
})