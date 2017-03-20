import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { updateGameMove, jumpToMove } from '../actions'
import '../css/TicTacToe.css';

class Square extends Component {
  render() {
    const { onClick, holder, index } = this.props;

    return (
      <button className="square" onClick={onClick} value={index}>
        {holder}
      </button>
    );
  }
}

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  holder: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};


class Board extends Component {
  renderSquare(i) {
    const { squares, squareClickHandler } = this.props;
    const holder = squares[i] || '';

    return <Square onClick={squareClickHandler} index={i} holder={holder}/>;
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

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  squareClickHandler: PropTypes.func.isRequired,
};


class TicTacToe extends Component {
  constructor() {
    super();

    this.squareClicked = this.squareClicked.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  squareClicked(evt) {
    const { value, textContent } = evt.target;

    if (textContent || this.calculateWinner(squares)) {
      // skip if square already been marked or
      // there is already a winner
      return false;
    }

    this.props.updateGameMove(value);
  }

  renderTravelItems() {
    return this.props.moveRecords.map((squares, i) => {
      return (
        <li className="travel-item" key={i}>
          <button onClick={this.jumpTo(i)}>Move #{i}</button>
        </li>
      )
    });
  }

  jumpTo(index) {
    return () => this.props.jumpToMove(index);
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

  render() {
    const { onXPlay, squares } = this.props;
    const winner = this.calculateWinner(squares);
    const status = winner ? 'Winner ' + winner : 'Next player: ' + (onXPlay ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} squareClickHandler={this.squareClicked} />
        </div>
        <div className="game-info">
          <div className="status">{ status }</div>
          <ol className="travel-list">{this.renderTravelItems()}</ol>
        </div>
      </div>
    );
  }
}

TicTacToe.propTypes = {
  onXPlay: PropTypes.boolean.isRequired,
  squares: PropTypes.array.isRequired,
  moveRecords: PropTypes.array.isRequired,
  jumpToMove: PropTypes.func.isRequired,
  updateGameMove: PropTypes.func.isRequired,
};


// Redux handling
const mapStateToProps = (state) => {
  return {
    squares: state.squares,
    onXPlay: state.onXPlay,
    moveRecords: state.moveRecords,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateGameMove: (index) => {
      dispatch(updateGameMove(index))
    },

    jumpToMove: (index) => {
      dispatch(jumpToMove(index))
    },
  }
}

const TicTacToeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToe)

export default TicTacToeContainer;
