import chai from 'chai'
import scheduleReducer from './../src/reducers/scheduleReducer.js'

let expect = chai.expect

describe('scheduleReducer', () => {
  it('should add generator object with action: ADD_GENERATOR', () => {
    expect(
      scheduleReducer([], {
        type: 'ADD_GENERATOR',
        schedule: {generator: 'abc'}
      })
    ).to.deep.equal([{ generator: 'abc', time: '', cmd: '', status: '' }])
  })

  it('should remove generator with action: REMOVE_GENERATOR', () => {
    const state = [{ generator: 'abc', time: '', cmd: '', status: '' }]
    expect(
      scheduleReducer(state, {
        type: 'REMOVE_GENERATOR',
        schedule: {generator: 'abc'}
      })
    ).to.eql([])
  })

  it('should return default state if action not found', () => {
    expect(
      scheduleReducer(['default'], {
        type: 'WRONG_ACTION',
        schedule: {generator: 'abc'}
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
    const state = [{ generator: 'abc', time: '', cmd: '', status: '' }]
    expect(
      scheduleReducer(state, {
        type: 'SAVE_TIME',
        schedule: {generator: 'abc', time: '20170428T10:10:10Z'}
      })
    ).to.deep.equal([{ generator: 'abc', time: '20170428T10:10:10Z', cmd: '', status: '' }])
  })

  it('should save CMD to specific generator with: SAVE_COMMAND', () => {
    const state = [{ generator: 'abc', time: '', cmd: '', status: '' }]
    expect(
      scheduleReducer(state, {
        type: 'SAVE_COMMAND',
        schedule: {generator: 'abc', cmd: 'ping www.g.com'}
      })
    ).to.deep.equal([{ generator: 'abc', time: '', cmd: 'ping www.g.com', status: '' }])
  })
  it('should set state = [] with: SCHEDULE_BEEN_SAVED', () => {
    const state = [{ generator: 'abc', time: '', cmd: '', status: '' }]
    expect(
      scheduleReducer(state, {
        type: 'SCHEDULE_BEEN_SAVED',
        schedule: ''
      })
    ).to.eql([])
  })
})