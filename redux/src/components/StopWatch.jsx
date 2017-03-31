import React, { Component, PropTypes } from 'react';
import Label from './Label';
import Button from './Button';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateTiming, updateResetCountDown } from '../actions'
// import './StopWatch.css';

class StopWatch extends Component {

  _isRunning = false
  _stopWatchTimer = null
  _longpressDelay = null
  _countProgressTimer = null

  _now = 0
  _readyToReset = false

  start = () => {
    this._now = Date.now() - this.props.timing;

    this._stopWatchTimer = setInterval(() => {
      this.props.updateTiming(Date.now() - this._now);
    });

    this._isRunning = true;
  }

  pause = () => {
    this.__clearStopWatchTimer();
    this._isRunning = false;
  }

  reset = () => {
    this.__clearStopWatchTimer();
    this._isRunning = false;

    this.props.updateTiming(0);
  }

  _longPressResetStart = () => {
    if (this.props.timing === 0) {
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
      this.props.updateResetCountDown(Date.now() - now);
    }, 500);
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

  _getResetCountDownText() {
    const remain = this.props.resetCountDownTime - this.props.resetCountedDown;
    return remain ? `LongPress ${Math.ceil(remain / 1000)} secs to reset` : 'Ready to reset';
  }

  render() {
    return (
      <div>
        <Label customClass="timing" text={`${this.props.timing}ms`}/>
        <br/>
        <Label customClass="isRunning" text={`isRunning: ${this._isRunning}`}/>
        <br/>
        <br/>
        <Button
          text={this._isRunning
          ? "Pause"
          : "Start"}
          onClick={this._isRunning
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
  resetCountDownTime: PropTypes.number.isRequired,
  resetCountedDown: PropTypes.number.isRequired,
  timing: PropTypes.number.isRequired,
  updateTiming: PropTypes.func.isRequired,
  updateResetCountDown: PropTypes.func.isRequired,
}

StopWatch.defaultProps = {
  resetCountDownTime: 3000
}


// Redux handling
const mapStateToProps = state => ({
  resetCountedDown: state.stopWatchReducer.resetCountedDown,
  timing: state.stopWatchReducer.timing,
})

const mapDispatchToProps = dispatch => ({
  updateTiming: bindActionCreators(updateTiming, dispatch),
  updateResetCountDown: bindActionCreators(updateResetCountDown, dispatch),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StopWatch)
