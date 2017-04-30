// notification structure example:
// notification = [
//   { type: 'info/warn/error', msg: 'xxx is success' }
// ]

export default function notificationReducer(state = [], action) {
  switch(action.type) {
    case 'PUSH_NOTIFICATION':
      if(!!action.notification) {
        return [
          ...state,
          action.notification
        ]
      } else {
        return state
      }

    case 'POP_NOTIFICATION':
      return state.slice(0, -1)

    default:
      return state
  }
}