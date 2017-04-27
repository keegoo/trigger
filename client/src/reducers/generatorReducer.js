export default function generatorReducer(state = [], action){
  if(!action.hasOwnProperty('generator')){
    return state
  }

  switch(action.type) {
    case 'ADD_GENERATOR':
      return [
        ...state,
        action.generator
      ]

    case 'REMOVE_GENERATOR':
      return state.filter((x) => x != action.generator)

    default:
      return state
  }
}