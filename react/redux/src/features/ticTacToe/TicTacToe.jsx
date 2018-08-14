import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateGameMove, jumpToMove } from './ticTacToeActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './TicTacToe.css';

/**
 * Square Component
 */
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

/**
 * Board Component
 */
class Board extends Component {
  renderSquare(i) {
    const { squares, squareClickHandler } = this.props;
    const holder = squares[i] || '';

    return <Square onClick={squareClickHandler} index={i} holder={holder} />;
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
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  squareClickHandler: PropTypes.func.isRequired,
};

/**
 * TicTacToe Component
 */
class TicTacToe extends Component {
  constructor() {
    super();

    this.squareClicked = this.squareClicked.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  squareClicked(evt) {
    const { value, textContent } = evt.target;

    if (textContent || this.calculateWinner(this.props.squares)) {
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
          <Button
            color="secondary"
            variant="outlined"
            size="small"
            onClick={this.jumpTo(i)}>
            Back to step #{i + 1}
          </Button>
        </li>
      );
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  componentWillUnmount() {
    this.props.jumpToMove(0);
  }

  render() {
    const { onXPlay, squares } = this.props;
    const winner = this.calculateWinner(squares);
    const status = winner
      ? 'Winner ' + winner
      : 'Next player: ' + (onXPlay ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} squareClickHandler={this.squareClicked} />
        </div>
        <div className="game-info">
          <Typography variant="subheading" className="status">
            {status}
          </Typography>
          <ol className="travel-list">{this.renderTravelItems()}</ol>
        </div>
      </div>
    );
  }
}

TicTacToe.propTypes = {
  onXPlay: PropTypes.bool.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  moveRecords: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string).isRequired)
    .isRequired,
  jumpToMove: PropTypes.func.isRequired,
  updateGameMove: PropTypes.func.isRequired,
};

// Redux handling
const mapStateToProps = state => ({
  squares: state.ticTacToeReducer.squares,
  onXPlay: state.ticTacToeReducer.onXPlay,
  moveRecords: state.ticTacToeReducer.moveRecords,
});

export default connect(
  mapStateToProps,
  {
    updateGameMove,
    jumpToMove,
  },
)(TicTacToe);
