import React, { Component } from 'react';
import '../css/TicTacToe.css';

class Square extends React.Component {
  render() {
    const { onClick, holder, index } = this.props;

    return (
      <button className="square" onClick={onClick} value={index}>
        {holder ? holder: ''}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    const holder = this.props.squares[i];
    return <Square onClick={this.props.squareClickHandler} index={i} holder={holder}/>;
  }

  render() {
    return (
      <div>
         <div className="board-row">
          {this.renderSquare(0)} {this.renderSquare(1)} {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)} {this.renderSquare(4)} {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)} {this.renderSquare(7)} {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class TicTacToe extends React.Component {
  constructor() {
    super();

    this.state = {
      squares: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      onFirstPlayer: true,
      winner: null
    };

    this.restart = this.restart.bind(this);
    this.squareClicked = this.squareClicked.bind(this);
  }

  squareClicked(evt) {
    const { value, textContent } = evt.target;
    const { onFirstPlayer, squares, winner } = this.state;

    if (textContent || winner) {
      // skip if square already been marked or
      // there is already a winner
      return false;
    }

    let newSquares = squares;
    newSquares[value] = onFirstPlayer ? 'X' : 'O';

    // update state
    this.setState((prevState, props) => {
      return {
        squares: newSquares,
        onFirstPlayer: !prevState.onFirstPlayer,
      }
    }, () => {
      // callback after state set done
      const winner = this.calculateWinner(this.state.squares);

      if (winner) {
        this.setState({
          winner
        })
      }
    })
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  restart() {
    const initSquares = Array(9).fill(null);
    this.setState({
      squares: initSquares,
      onFirstPlayer: true,
      winner: null
    });
  }

  render() {
    const { onFirstPlayer, winner } = this.state;
    const status = winner ? 'Winner ' + winner : 'Next player: ' + (onFirstPlayer ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board {...this.state} squareClickHandler={this.squareClicked} />
        </div>
        <div className="game-info">
          <div className="status">{ status }</div>
          <button onClick={this.restart}>Restart</button>
          <ol>{/* TODO time travel */}</ol>
        </div>
      </div>
    );
  }
}

export default TicTacToe;
