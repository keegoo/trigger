import { createStore } from 'redux'
import scheduleReducer from './../reducers/scheduleReducer.js'

export default function configureStore(){
  return createStore(scheduleReducer)
}