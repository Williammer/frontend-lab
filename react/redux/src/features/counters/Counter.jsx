import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  increment,
  incrementIfOdd,
  incrementAsync,
  decrement,
} from './counterActions';
import Button from '@material-ui/core/Button';

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
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={() => dispatch(increment())}>
          +
        </Button>{' '}
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={() => dispatch(decrement())}>
          -
        </Button>{' '}
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={this.incrementIfOdd.bind(this)}>
          Increment if odd
        </Button>{' '}
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={() => dispatch(incrementAsync())}>
          Increment async
        </Button>
      </p>
    );
  }
}

Counter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default Counter;
