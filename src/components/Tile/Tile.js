import React from 'react';
import './Tile.css';

const Tile = (props) => {

  return (
    <div className='tile' id={props.id} onClick={(e) => props.updateTile(e)}>
      {!props.status ? <h1>{props.value}</h1> : null}
    </div>
  );
}

export default Tile;
