import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {fetchQuiz} from '../state/action-creators'


const Answer = (props) => {

  return(
   
        <div className={`answer${props.isSelected ? ' selected' : ''}`} >
            {props.text}
            <button>
              {props.isSelected ? 'SELECTED' : 'select' }
            </button>
        </div> 
   
  )
}

const Quiz = (props) => {
  const {quiz, selectedAnswer} = props
  
  
  useEffect(() => {
    props.fetchQuiz()
  }, []); 


  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <div id="quizAnswers">
              <h2>{quiz.question}</h2>
                  {quiz.answers.map( (answer, idx) => (
                  <Answer 
                    key={answer.answer_id} 
                    id={answer.answer_id} 
                    text={answer.text}
                    isSelected = { answer.answer_id === selectedAnswer }
                  />
              ))}
          </div>

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

export default connect(mapStateToProps, {fetchQuiz})(Quiz)