import * as types from './action-types'


// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'

const initialWheelState = 0
function wheel(wheelState = initialWheelState, action) {
  // console.log('enter wheel reducer action.type', action.type)
  switch(action.type){
    case types.MOVE_CLOCKWISE:
      // console.log('enter wheel reducer')
      return wheelState <5 ? wheelState + 1 : 0 
       
    case types.MOVE_COUNTERCLOCKWISE:
        return wheelState > 0  ? wheelState - 1 : 5
      
    default: 
      return wheelState
    } 
}

const initialQuizState = null
function quiz(quizState = initialQuizState, action) {
  switch(action.type){
    case types.SET_QUIZ_INTO_STATE:
      return action.payload





    default:
      return quizState

  }



}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
