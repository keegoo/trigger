import { expect } from 'chai'
import rootReducer from './../../src/reducers/rootReducer.js'


describe('rootReducer', () => {
  it('should return schedule state with scheduleReducer action', () => {
    expect(
      rootReducer({}, {
        type: 'ADD_GENERATOR',
        task: {generator: 'abc'}
      })
    ).to.deep.equal({
      tasks: [{ generator: 'abc', time: '', cmd: '' }],
      notification: []
    })
  })

  it('should return notification state with notificationReducer action', () => {
    expect(
      rootReducer({} , {
        type: 'PUSH_NOTIFICATION',
        notification: {type: 'info', msg: 'an info message'}
      })
    ).to.deep.equal({
      tasks: [],
      notification: [{type: 'info', msg: 'an info message'}]
    })
  })
})