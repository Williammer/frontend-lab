import React, { Component, PropTypes } from 'react';
import Label from './Label';
import Button from './Button';
// import './StopWatch.css';

class StopWatch extends Component {
  state = {
    timing: 0,
    resetCountedDown: 0,
    isRunning: false
  }

  _stopWatchTimer = null
  _longpressDelay = null
  _countProgressTimer = null

  _now = 0
  _readyToReset = false

  start = () => {
    this._now = Date.now() - this.state.timing;

    this._stopWatchTimer = setInterval(() => {
      this.setState({
        timing: Date.now() - this._now
      });
    });

    this.setState({ isRunning: true });
  }

  pause = () => {
    this.__clearStopWatchTimer();
    this.setState({ isRunning: false });
  }

  reset = () => {
    this.__clearStopWatchTimer();
    this.setState({ timing: 0, isRunning: false });
  }

  _longPressResetStart = () => {
    if (this.state.timing === 0) {
      return;
    }

    const now = Date.now();

    this._longpressDelay = window.setTimeout(() => {
      this._readyToReset = true;
    }, this.props.resetCountDown);

    this._showCountProgress(now);
  }

  _longPressResetEnd = () => {
    this.__clearLongpressDelay();

    if (this._readyToReset) {
      this._readyToReset = false;
      this.reset();
    }

    this._resetCountProgress();
  }

  _showCountProgress(now) {
    this._countProgressTimer = window.setInterval(() => {
      this.setState({
        resetCountedDown: Date.now() - now
      });
    }, 500);
  }

  _resetCountProgress() {
    this.__clearCountProgressTimer();

    this.setState({
      resetCountedDown: 0
    });
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

  _getResetCountDownText() {
    const remain = this.props.resetCountDown - this.state.resetCountedDown;

    return (remain > 0) ? `LongPress ${Math.ceil(remain / 1000)} secs to reset` : 'Ready to reset';
  }

  render() {
    return (
      <div>
        <Label customClass="timing" text={`${this.state.timing}ms`}/>
        <br/>
        <Label customClass="isRunning" text={`isRunning: ${this.state.isRunning}`}/>
        <br/>
        <br/>
        <Button
          text={this.state.isRunning
          ? "Pause"
          : "Start"}
          onClick={this.state.isRunning
          ? this.pause
          : this.start}
        />
        <br/>
        <button
          onMouseDown={this._longPressResetStart}
          onMouseUp={this._longPressResetEnd}
        >
        {this._getResetCountDownText()}
        </button>
      </div>
    );
  }
}

StopWatch.propTypes = {
  resetCountDown: PropTypes.number.isRequired
}
StopWatch.defaultProps = {
  resetCountDown: 3000
}

export default StopWatch;
