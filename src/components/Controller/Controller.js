import React from 'react';
import './Controller.css';

const Controller = (props) => {

  return (
    <div className='controller'>
      {props.gameState === 'before' ? <button className='start-button' onClick={(e) => props.start(e)}>Start</button> : null}
      {props.gameState === 'during' ? <div>Find all the matches :)</div> : null}
      {props.gameState === 'over' ? <button className='start-button' onClick={(e) => props.start(e)}>Play Again</button> : null}
    </div>
  );
}

export default Controller;
