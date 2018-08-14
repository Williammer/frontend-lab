import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { updateTiming, setIsRunning } from './stopWatchActions';

class StopWatch extends Component {
  constructor(props) {
    super(props);

    this.startTiming = this.startTiming.bind(this);
    this.pauseTiming = this.pauseTiming.bind(this);
    this.resetTiming = this.resetTiming.bind(this);
    this.reset = this.reset.bind(this);
  }

  // timers
  _stopWatchTimer = null;
  _countProgressTimer = null;

  startTiming() {
    const now = Date.now() - this.props.timing;

    this._stopWatchTimer = window.setInterval(
      function() {
        this.props.updateTiming(Date.now() - now);
      }.bind(this),
    );

    this.props.setIsRunning(true);
  }

  pauseTiming() {
    this.__clearStopWatchTimer();
    this.props.setIsRunning(false);
  }

  resetTiming() {
    this.__clearStopWatchTimer();
    this.props.setIsRunning(false);
    this.props.updateTiming(0);
  }

  reset() {
    this.resetTiming();
    this._resetCountProgress();
  }

  _showCountProgress(now) {
    this._countProgressTimer = window.setInterval(
      function() {
        if (Date.now() - now <= 0) {
          // clear interval if reached countdown end
          this.__clearCountProgressTimer();
          return;
        }
      }.bind(this),
      500,
    );
  }

  _resetCountProgress() {
    this.__clearCountProgressTimer();
  }

  __clearStopWatchTimer() {
    if (this._stopWatchTimer) {
      clearInterval(this._stopWatchTimer);
      this._stopWatchTimer = null;
    }
  }

  __clearCountProgressTimer() {
    if (this._countProgressTimer) {
      window.clearInterval(this._countProgressTimer);
      this._countProgressTimer = null;
    }
  }

  componentWillUnmount() {
    this.reset();
  }

  render() {
    return (
      <div>
        <Typography variant="headline" color="textPrimary">{`${
          this.props.timing
        } ms`}</Typography>
        <Typography
          variant="subheading"
          color="textPrimary"
          gutterBottom>{`isRunning: ${this.props.isRunning}`}</Typography>
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={this.props.isRunning ? this.pauseTiming : this.startTiming}>
          {this.props.isRunning ? 'Pause' : 'Start'}
        </Button>{' '}
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={this.reset}>
          Reset
        </Button>
      </div>
    );
  }
}

StopWatch.propTypes = {
  timing: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  updateTiming: PropTypes.func.isRequired,
};

// Redux handling
const mapStateToProps = state => ({
  timing: state.stopWatchReducer.timing,
  isRunning: state.stopWatchReducer.isRunning,
});

export default connect(
  mapStateToProps,
  {
    updateTiming,
    setIsRunning,
  },
)(StopWatch);
