// schedule structure example:
// schedule = [
//   {generator: , time: , cmd: , status: },
//   ...
// ]

export default function scheduleReducer(state = [], action){
  if(!action.hasOwnProperty('schedule')){
    return state
  }

  let a, b

  switch(action.type) {
    case 'ADD_GENERATOR':
      return [
        ...state,
        { 
          generator: action.schedule.generator, 
          time: '', 
          cmd: '', 
          status: '' 
        }
      ]

    case 'REMOVE_GENERATOR':
      return state.filter((x) => x.generator != action.schedule.generator)

    case 'SAVE_TIME':
      a = state.filter((x) => x.generator != action.schedule.generator)
      b = state.filter((x) => x.generator == action.schedule.generator)
      return [
        ...a,
        Object.assign(
          {},
          b[0],
          {time: action.schedule.time}
        )
      ]

    case 'SAVE_COMMAND':
      a = state.filter((x) => x.generator != action.schedule.generator)
      b = state.filter((x) => x.generator == action.schedule.generator)
      return [
        ...a,
        Object.assign(
          {},
          b[0],
          {cmd: action.schedule.cmd}
        )
      ]

    case 'SCHEDULE_BEEN_SAVED':
      return []

    default:
      return state
  }
}