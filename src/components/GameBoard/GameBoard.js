import React from 'react';
import Tile from '../Tile/Tile';
import './GameBoard.css';

const GameBoard = (props) => {

  let gameboard = props.board.map((tile, idx) => <Tile value={tile.value} status={tile.hidden} key={idx} id={idx} updateTile={props.updateTile} />);

  return (
    <div id='gameboard'>
      {gameboard}
    </div>
  );
}

export default GameBoard;
