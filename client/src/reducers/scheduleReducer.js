// tasks structure example:
// tasks = [
//   { generator: , time: , cmd: },
//   ...
// ]

export default function scheduleReducer(state = [], action){
  if(!action.hasOwnProperty('task')){
    return state
  }

  let a, b

  switch(action.type) {
    case 'ADD_GENERATOR':
      return [
        ...state,
        { 
          generator: action.task.generator, 
          time: '', 
          cmd: ''
        }
      ]

    case 'REMOVE_GENERATOR':
      return state.filter((x) => x.generator != action.task.generator)

    case 'SAVE_TIME':
      a = state.filter((x) => x.generator != action.task.generator)
      b = state.filter((x) => x.generator == action.task.generator)
      return [
        ...a,
        Object.assign(
          {},
          b[0],
          {time: action.task.time}
        )
      ]

    case 'SAVE_COMMAND':
      a = state.filter((x) => x.generator != action.task.generator)
      b = state.filter((x) => x.generator == action.task.generator)
      return [
        ...a,
        Object.assign(
          {},
          b[0],
          {cmd: action.task.cmd}
        )
      ]

    case 'SCHEDULE_BEEN_SAVED':
      return []

    default:
      return state
  }
}