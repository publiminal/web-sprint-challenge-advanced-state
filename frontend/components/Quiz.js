import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {fetchQuiz, selectAnswer, postAnswer, setMessage } from '../state/action-creators'


const Answer = (props) => {

  return(
   
        <div className={`answer${props.isSelected ? ' selected' : ''}`} >
            {props.text}
            <button onClick={ ()=>props.handleAnswerClick(props.id) }> 
              {props.isSelected ? 'SELECTED' : 'select' }
            </button>
        </div> 
   
  )
}

const Quiz = (props) => {
  const {fetchQuiz,  quiz, selectedAnswer, selectAnswer, postAnswer, setMessage } = props
  
  
  useEffect(() => {
    if(!quiz) fetchQuiz()
  }, []); 

  const handleAnswerClick = (answerId) => {
      // setMessage('')//reset answer message if needed.
      selectAnswer(answerId)
  }

  const handlePostAnswer = () => {
    postAnswer({quizId:quiz.quiz_id, answerId:selectedAnswer})
    // fetchQuiz() 
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
          <h2>{quiz.question}</h2>
          <div id="quizAnswers">
                  {quiz.answers.map( (answer) => (
                  <Answer 
                    key={answer.answer_id} 
                    id={answer.answer_id} 
                    text={answer.text}
                    handleAnswerClick={handleAnswerClick}
                    isSelected = { answer.answer_id === selectedAnswer }
                  />
              ))}
          </div>
          <button disabled={!selectedAnswer} onClick={handlePostAnswer} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

 const mapStateToProps = (state) => {
   return{
     quiz:state.quiz,
     selectedAnswer:state.selectedAnswer
   }
 }

export default connect(mapStateToProps, {fetchQuiz, selectAnswer, postAnswer, setMessage})(Quiz)