import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {
  updateTiming,
  updateResetCountDown,
  setIsRunning,
} from './stopWatchActions';

class StopWatch extends Component {
  constructor(props) {
    super(props);

    this.startTiming = this.startTiming.bind(this);
    this.pauseTiming = this.pauseTiming.bind(this);
    this.resetTiming = this.resetTiming.bind(this);
    this.startLongPressReset = this.startLongPressReset.bind(this);
    this.endLongPressReset = this.endLongPressReset.bind(this);
    this.reset = this.reset.bind(this);
  }

  // timers
  _stopWatchTimer = null;
  _longpressDelay = null;
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

  startLongPressReset() {
    if (this.props.timing === 0) {
      return;
    }

    this._showCountProgress(Date.now());
  }

  endLongPressReset() {
    const remain = this.props.resetCountDownTime - this.props.resetCountedDown;
    if (remain <= 0) {
      this.resetTiming();
    }

    this.__clearLongpressDelay();
    this._resetCountProgress();
  }

  reset() {
    this.resetTiming();
    this._resetCountProgress();
    this.__clearLongpressDelay();
  }

  getResetCountDownText() {
    const remain = this.props.resetCountDownTime - this.props.resetCountedDown;
    return remain > 0
      ? `LongPress ${Math.ceil(remain / 1000)} secs to reset`
      : 'Ready to reset';
  }

  _showCountProgress(now) {
    this._countProgressTimer = window.setInterval(
      function() {
        if (Date.now() - now <= 0) {
          // clear interval if reached countdown end
          this.__clearCountProgressTimer();
          return;
        }

        this.props.updateResetCountDown(Date.now() - now);
      }.bind(this),
      500,
    );
  }

  _resetCountProgress() {
    this.__clearCountProgressTimer();
    this.props.updateResetCountDown(0);
  }

  __clearStopWatchTimer() {
    if (this._stopWatchTimer) {
      clearInterval(this._stopWatchTimer);
      this._stopWatchTimer = null;
    }
  }

  __clearLongpressDelay() {
    if (this._longpressDelay) {
      window.clearTimeout(this._longpressDelay);
      this._longpressDelay = null;
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
          onMouseDown={this.startLongPressReset}
          onMouseUp={this.endLongPressReset}>
          {this.getResetCountDownText()}
        </Button>
      </div>
    );
  }
}

StopWatch.propTypes = {
  resetCountDownTime: PropTypes.number.isRequired,
  resetCountedDown: PropTypes.number.isRequired,
  timing: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  updateTiming: PropTypes.func.isRequired,
  updateResetCountDown: PropTypes.func.isRequired,
};

StopWatch.defaultProps = {
  resetCountDownTime: 3000, // long press 3s to be able to reset
};

// Redux handling
const mapStateToProps = state => ({
  timing: state.stopWatchReducer.timing,
  resetCountedDown: state.stopWatchReducer.resetCountedDown,
  isRunning: state.stopWatchReducer.isRunning,
});

export default connect(
  mapStateToProps,
  {
    updateTiming,
    updateResetCountDown,
    setIsRunning,
  },
)(StopWatch);
