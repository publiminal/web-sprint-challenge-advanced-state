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
  console.log('entro a reducer quizState', action.payload)
  
  switch(action.type){
    case types.SET_QUIZ_INTO_STATE:
      return action.payload





    default:
      return quizState

  }



}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  // console.log('entro a reducer selectAnswer', action.payload)
  switch(action.type){
    case types.SET_SELECTED_ANSWER:
      return action.payload
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  // console.log('entro a reducer infoMessage')
  switch(action.type){
    case types.SET_INFO_MESSAGE:
      return action.payload
    default:
      return state
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    case types.INPUT_CHANGE:
      const {name, value} = action.payload
      return {...state, [name]:value}

      case types.RESET_FORM:
      return {
        newQuestion: '',
        newTrueAnswer: '',
        newFalseAnswer: '',
      }

    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
