import scheduleReducer from './scheduleReducer.js'
import notificationReducer from './notificationReducer.js'

export default function rootReducer(state = {}, action) {
  return {
    schedule: scheduleReducer(state.schedule, action),
    notification: notificationReducer(state.notification, action)
  }
}