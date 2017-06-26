import { expect } from 'chai'
import scheduleReducer from './../../src/reducers/scheduleReducer.js'


describe('scheduleReducer', () => {
  it('should add generator object with action: ADD_GENERATOR', () => {
    expect(
      scheduleReducer([], {
        type: 'ADD_GENERATOR',
        task: {generator: 'abc'}
      })
    ).to.deep.equal([{ generator: 'abc', time: '', cmd: '' }])
  })

  it('should add more than one generator with action: ADD_GENERATOR'), () => {
    store = scheduleReducer([], {
      type: 'ADD_GENERATOR',
      task: { generator: 'abc' }
    })

    expect(
      scheduleReducer(store, {
        type: 'ADD_GENERATOR',
        task: {generator: 'bcd'}
      }).to.deep.equal([
        { generator: 'abc', time: '', cmd: '' },
        { generator: 'bcd', time: '', cmd: '' }
      ])
    )
  }

  it('should remove generator with action: REMOVE_GENERATOR', () => {
    const state = [{ generator: 'abc', time: '', cmd: '' }]
    expect(
      scheduleReducer(state, {
        type: 'REMOVE_GENERATOR',
        task: {generator: 'abc'}
      })
    ).to.eql([])
  })

  it('should return default state if action not found', () => {
    expect(
      scheduleReducer(['default'], {
        type: 'WRONG_ACTION',
        task: {generator: 'abc'}
      })
    ).to.eql(['default'])
  })

  it('should return default state if data is wrong', () => {
    expect(
      scheduleReducer(['default'], {
        type: 'ADD_GENERATOR',
        name: {generator: 'abc'}
      })
    ).to.eql(['default'])
  })

  it('should save time to specific generator with: SAVE_TIME', () => {
    const state = [{ generator: 'abc', time: '', cmd: '' }]
    expect(
      scheduleReducer(state, {
        type: 'SAVE_TIME',
        task: {generator: 'abc', time: '20170428T10:10:10Z'}
      })
    ).to.deep.equal([{ generator: 'abc', time: '20170428T10:10:10Z', cmd: '' }])
  })

  it('should save CMD to specific generator with: SAVE_COMMAND', () => {
    const state = [{ generator: 'abc', time: '', cmd: '' }]
    expect(
      scheduleReducer(state, {
        type: 'SAVE_COMMAND',
        task: {generator: 'abc', cmd: 'ping www.g.com'}
      })
    ).to.deep.equal([{ generator: 'abc', time: '', cmd: 'ping www.g.com' }])
  })
  it('should set state = [] with: SCHEDULE_BEEN_SAVED', () => {
    const state = [{ generator: 'abc', time: '', cmd: '' }]
    expect(
      scheduleReducer(state, {
        type: 'SCHEDULE_BEEN_SAVED',
        task: ''
      })
    ).to.eql([])
  })
})