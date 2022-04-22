import React from 'react'
import {connect} from 'react-redux'
import {moveClockwise, moveCounterClockwise} from '../state/action-creators'
 
//className={`square${props.selected ? ' active' : ''}`}
//className={`cog${props.wheel === props.id ? ' active' : ''}`}
 
const Circle = (props) => {
  return(
    <div 
      className={`cog${props.selected ? ' active' : ''}`} /* className="cog active" */ 
      style={{ "--i": props.id }}
    >{props.selected&& <p>B</p>}
    </div>
)}


const Wheel = (props) => {
  const { wheel } = props
  const board = ['','','','','','']

  return (
    <div id="wrapper">
      <div id="wheel">

      {board.map( (circle, idx) => (
            <Circle key={Date.now()+idx} id={idx} selected={props.wheel === idx} />
        ))}      

      </div>
      <div id="keypad">
        <button onClick={props.moveCounterClockwise} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={props.moveClockwise} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}
const mapStateToProps = (state) =>{
  return{
    wheel:state.wheel
  }
}

export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel) 

