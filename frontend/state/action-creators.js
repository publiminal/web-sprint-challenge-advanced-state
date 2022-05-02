
import axios from 'axios'
import * as types from '../state/action-types'

// ❗ You don't need to add extra action creators to achieve MVP
export const moveClockwise = () => {
  // console.log('move clockwise')
  return{ type:types.MOVE_CLOCKWISE }  
}

export const moveCounterClockwise = () => {
  // console.log('move counter clockwise')
  return{ type:types.MOVE_COUNTERCLOCKWISE }  

 }

export function selectAnswer(answerId) {
    return (dispatch) => {

      console.log('select Answer Creator', answerId)
      dispatch(setMessage('')) // clean message if needed
      dispatch({type:types.SET_SELECTED_ANSWER, payload:answerId})
    }
 }

export function setMessage(message) { 
  console.log('entro a setMessage')
  return {type:types.SET_INFO_MESSAGE, payload:message}
}

export function setQuiz(quiz) {  
  return { type: types.SET_QUIZ_INTO_STATE, payload: quiz }
 }

export function inputChange(name, value) { 
  return { type: types.INPUT_CHANGE, payload: {name:name, value:value } }
}

export function resetForm() {
  return { type: types.RESET_FORM }
}

// ❗ Async action creators
export const fetchQuiz = () => {
  console.log('entro a fetch Quiz')
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: '' })
    // setQuiz(null)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      console.log('after quiz fetched !!')
      // debugger
      const quizFromAPI = res.data
      dispatch(setQuiz(quizFromAPI))
    })
    .catch(err => {
      // debugger
      console.log(err.message)
      dispatch(setMessage(err.message))
    })
  }
}
 // { "quiz_id": "LVqUh", "answer_id": "0VEv0" } 
export function postAnswer({quizId, answerId}) {
  return function (dispatch) {
    const info = {quiz_id:quizId,answer_id:answerId }
    // debugger
    axios.post('http://localhost:9000/api/quiz/answer', info )
    .then(res => {
      console.log('ok answer post ', res)
      dispatch(setMessage(res.data.message))
      dispatch(setQuiz(null))
      dispatch(fetchQuiz())
      //
    })
    .catch(err => {
      // debugger
      console.log('error ', err.message)
      dispatch(setMessage(err.message))
    })

    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}



// {newQuestion:newQuestion, newTrueAnswer:newTrueAnswer, newFalseAnswer:newFalseAnswer}
// http://localhost:9000/api/quiz/new
// Example of payload: { "question_text": "Love JS?", "true_answer_text": "yes", "false_answer_text": "nah" }
export function postQuiz(params) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form

    const {newQuestion, newTrueAnswer, newFalseAnswer} = params
    const info = { question_text: newQuestion.trim(), true_answer_text: newTrueAnswer.trim(), false_answer_text: newFalseAnswer.trim() }
    console.log(info)
    axios.post('http://localhost:9000/api/quiz/new', info)
    .then(res => {
      // debugger
      const quizFromAPI = res.data
      // console.log('res', res)
      dispatch(resetForm())
      const message = `Congrats: "${quizFromAPI.question}" is a great question!`
      dispatch(setMessage(message))
    })
    .catch(err => {
      // debugger
      // console.log(err.message)
      dispatch({ type: types.SET_INFO_MESSAGE, payload: err.message })
    })


  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
