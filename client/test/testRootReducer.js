import chai from 'chai'
import rootReducer from './../src/reducers/rootReducer.js'

let expect = chai.expect

describe('rootReducer', () => {
  it('should return schedule state with scheduleReducer action', () => {
    expect(
      rootReducer({}, {
        type: 'ADD_GENERATOR',
        schedule: {generator: 'abc'}
      })
    ).to.deep.equal({
      schedule: [{ generator: 'abc', time: '', cmd: '', status: '' }],
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
      schedule: [],
      notification: [{type: 'info', msg: 'an info message'}]
    })
  })
})