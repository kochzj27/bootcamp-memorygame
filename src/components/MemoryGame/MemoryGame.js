import React, { Component } from 'react';
import GameBoard from '../GameBoard/GameBoard';
import Controller from '../Controller/Controller';
import update from 'immutability-helper';
import './MemoryGame.css';


class MemoryGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameboard: [
        { value: 1, hidden: true },
        { value: 2, hidden: true },
        { value: 3, hidden: true },
        { value: 4, hidden: true },
        { value: 5, hidden: true },
        { value: 6, hidden: true },
        { value: 1, hidden: true },
        { value: 2, hidden: true },
        { value: 3, hidden: true },
        { value: 4, hidden: true },
        { value: 5, hidden: true },
        { value: 6, hidden: true },
      ],
      tmpGameBoard: null,
      click1id: null,
      click2id: null,
      matches: 0,
      gameState: 'before',
    }
  }

  resetTiles = () => {
    console.log("reset tiles");
    let tempTile1 = Object.assign({}, this.state.gameboard[this.state.click1id]);
    let tempTile2 = Object.assign({}, this.state.gameboard[this.state.click2id]);

    tempTile1.hidden = true;
    tempTile2.hidden = true;

    this.setState({
      gameboard: update(update(this.state.gameboard, { [this.state.click1id]: { $set: tempTile1 } }), { [this.state.click2id]: { $set: tempTile2 }, }),
      click1id: null,
      click2id: null,
    });
  }

  updateTile = (props) => {
    console.log('updating', props.target.id);
    let tempTile = Object.assign({}, this.state.gameboard[props.target.id]);
    console.log(this.state)
    if (tempTile.hidden && this.state.gameState === 'during' && (this.state.click1id === null || this.state.click2id === null)) {
      var tmpClickid1 = null;
      var tmpClickid2 = null;
      var matches = this.state.matches;
      var tempGameState = this.state.gameState;
      tempTile.hidden = false;

      if (this.state.click1id === null) {
        tmpClickid1 = props.target.id;
      } else if (tempTile.value === this.state.gameboard[this.state.click1id].value) {
        console.log("A MATCH");
        tmpClickid1 = null;
        if (matches === 5) {
          //game state is over
          tempGameState = 'over';
        } else {
          matches += 1;
        }
      } else {
        console.log("not a match")
        //hide last two clicked tiles
        tmpClickid2 = props.target.id;
        tmpClickid1 = this.state.click1id;
        setTimeout(this.resetTiles, 3000);

      }
      let idx = props.target.id;
      this.setState({
        gameboard: update(this.state.gameboard, { [idx]: { $set: tempTile } }),
        click1id: tmpClickid1,
        click2id: tmpClickid2,
        matches,
        gameState: tempGameState,
      })
    }
  }

  initBoard = () => {
    return ({
      gameboard: [
        { value: 1, hidden: false },
        { value: 2, hidden: false },
        { value: 3, hidden: false },
        { value: 4, hidden: false },
        { value: 5, hidden: false },
        { value: 6, hidden: false },
        { value: 1, hidden: false },
        { value: 2, hidden: false },
        { value: 3, hidden: false },
        { value: 4, hidden: false },
        { value: 5, hidden: false },
        { value: 6, hidden: false },
      ],
    });
  }

  hideAllTiles = () => {
    let newBoard = this.state.gameboard.map((tile, idx) => {
      return (
        { value: tile.value, hidden: true }
      )
    });
    this.setState({ gameboard: newBoard, gameState: 'during' });
  }

  startGame = (props) => {
    let newBoard = this.state.gameboard.map((tile, idx) => {
      return (
        { value: tile.value, hidden: false }
      )
    });
    this.setState({ gameboard: newBoard });
    setTimeout(this.hideAllTiles, 3000);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Memory Game</h1>
        <GameBoard board={this.state.gameboard} updateTile={this.updateTile} />
        <Controller gameState={this.state.gameState} start={this.startGame} />
      </div>
    );
  }
}

export default MemoryGame;
