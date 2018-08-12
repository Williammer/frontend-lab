import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  increment,
  incrementIfOdd,
  incrementAsync,
  decrement,
} from './counterActions';

class Counter extends Component {
  incrementIfOdd() {
    debugger;
    // using the dispatch passed by list.js dispatch prop, which isn't the original enhanced dispatch
    this.props.dispatch(incrementIfOdd());
  }

  render() {
    const { dispatch, counter } = this.props;
    return (
      <p>
        Clicked: {counter} times{' '}
        <button onClick={() => dispatch(increment())}>+</button>{' '}
        <button onClick={() => dispatch(decrement())}>-</button>{' '}
        <button onClick={this.incrementIfOdd.bind(this)}>
          Increment if odd
        </button>{' '}
        <button onClick={() => dispatch(incrementAsync())}>
          Increment async
        </button>
      </p>
    );
  }
}

Counter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default Counter;
