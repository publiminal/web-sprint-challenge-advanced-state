import React from 'react'
import { connect } from 'react-redux'
import { inputChange, postQuiz } from '../state/action-creators'

const Form = (props) => {
  const {inputChange, newQuestion, newTrueAnswer, newFalseAnswer, postQuiz} = props
  
  const onChange = evt => {
    console.log('`id is `',evt.target.id)
    console.log('`id is `', evt.target.value)
    inputChange(evt.target.id, evt.target.value)
  }

  const onSubmit = evt => {
      evt.preventDefault()
      // const params = {newQuestion:newQuestion, newTrueAnswer:newTrueAnswer, newFalseAnswer:newFalseAnswer}
      console.log('onsubmit', newQuestion )
      postQuiz({newQuestion:newQuestion, newTrueAnswer:newTrueAnswer, newFalseAnswer:newFalseAnswer})
  }

  const isDisabled = () => {
    const isDisabled = newQuestion.trim().length > 0 && newTrueAnswer.trim().length > 0 && newFalseAnswer.trim().length > 0  
    return !isDisabled
  }



  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} value={newQuestion} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} value={newTrueAnswer} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} value={newFalseAnswer} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button disabled={isDisabled()} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapStateToProps =(state) => {
  return{
    newQuestion:state.form.newQuestion,
    newTrueAnswer:state.form.newTrueAnswer,
    newFalseAnswer:state.form.newFalseAnswer
  }
}

export default connect(mapStateToProps, {inputChange, postQuiz})(Form)
