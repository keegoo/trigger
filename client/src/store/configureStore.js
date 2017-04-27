import { createStore } from 'redux'
import generatorReducer from './../reducers/generatorReducer.js'

export default function configureStore(){
  return createStore(generatorReducer)
}