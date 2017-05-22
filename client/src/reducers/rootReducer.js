import scheduleReducer from './scheduleReducer.js'
import notificationReducer from './notificationReducer.js'

export default function rootReducer(state = {}, action) {
  return {
    tasks: scheduleReducer(state.tasks, action),
    notification: notificationReducer(state.notification, action)
  }
}