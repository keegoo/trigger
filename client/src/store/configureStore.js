import { createStore } from 'redux'
import rootReducer from './../reducers/rootReducer.js'

export default function configureStore(){
  return createStore(rootReducer)
}