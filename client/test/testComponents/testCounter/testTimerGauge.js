import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import TimerGauge from 'srcDir/components/counter/TimerGauge.jsx'
import Gauge from 'srcDir/components/counter/Gauge.jsx'

describe('<TimerGauge />', () => {
  it('accept baseTimeAsSeconds as required props', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <TimerGauge baseTimeAsSeconds={180} />
      </MuiThemeProvider>
    )
    expect(wrapper.find(TimerGauge).get(0).props.baseTimeAsSeconds).to.equal(180)
  })

  it('should convert baseTimeAsSeconds into HH:MM:SS', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <TimerGauge baseTimeAsSeconds={180} />
      </MuiThemeProvider>
    )
    expect(wrapper.find(Gauge).get(0).props.label).to.equal('00:03:00')
  })

  it('use default value 0 if baseTimeAsSeconds not set', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <TimerGauge/>
      </MuiThemeProvider>
    )
    expect(wrapper.find(Gauge).get(0).props.label).to.equal('00:00:00')
  })
})