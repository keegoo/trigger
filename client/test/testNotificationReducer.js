import chai from 'chai'
import notificationReducer from './../src/reducers/notificationReducer.js'

let expect = chai.expect

describe('notificationReducer', () => {
  it('should add a notification with: PUSH_NOTIFICATION', () => {
    expect(
      notificationReducer([], {
        type: 'PUSH_NOTIFICATION',
        notification: {type: 'info', msg: 'an info message'}
      })
    ).to.deep.equal([{type: 'info', msg: 'an info message'}])
  })

  it('should remove a notification with: POP_NOTIFICATION', () => {
    const state = [{type: 'info', msg: 'an info message'}]
    expect(
      notificationReducer(state, {
        type: 'POP_NOTIFICATION'
      })
    ).to.eql([])
  })

  it('should return default state if action not found', () => {
    expect(
      notificationReducer(['default'], {
        type: 'WRONG_ACTION'
      })
    ).to.eql(['default'])
  })
})