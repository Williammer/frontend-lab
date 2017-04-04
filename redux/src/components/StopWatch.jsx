import React, { Component, PropTypes } from 'react';
import Label from './Label';
import Button from './Button';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateTiming, updateResetCountDown, setIsRunning } from '../actions'
// import './StopWatch.css';

class StopWatch extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.longPressResetStart = this.longPressResetStart.bind(this);
    this.longPressResetEnd = this.longPressResetEnd.bind(this);
  }

  _stopWatchTimer = null
  _longpressDelay = null
  _countProgressTimer = null

  start() {
    const now = Date.now() - this.props.timing;

    this._stopWatchTimer = window.setInterval(function() {
      this.props.updateTiming(Date.now() - now);
    }.bind(this));

    this.props.setIsRunning(true);
  }

  pause() {
    this.__clearStopWatchTimer();
    this.props.setIsRunning(false);
  }

  reset() {
    this.__clearStopWatchTimer();
    this.props.setIsRunning(false);
    this.props.updateTiming(0);
  }

  longPressResetStart() {
    if (this.props.timing === 0) {
      return;
    }

    this._showCountProgress(Date.now());
  }

  longPressResetEnd() {
    const remain = this.props.resetCountDownTime - this.props.resetCountedDown;
    if (remain <= 0) {
      this.reset();
    }

    this.__clearLongpressDelay();
    this._resetCountProgress();
  }

  getResetCountDownText() {
    const remain = this.props.resetCountDownTime - this.props.resetCountedDown;
    return remain > 0 ? `LongPress ${Math.ceil(remain / 1000)} secs to reset` : 'Ready to reset';
  }

  _showCountProgress(now) {
    this._countProgressTimer = window.setInterval(function() {
      if (Date.now() - now <= 0) {
        // clear interval if reached countdown end
        this.__clearCountProgressTimer();
        return;
      }

      this.props.updateResetCountDown(Date.now() - now);
    }.bind(this), 500);
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

  render() {
    return (
      <div>
        <Label customClass="timing" text={`${this.props.timing}ms`}/>
        <br/>
        <Label customClass="isRunning" text={`isRunning: ${this.props.isRunning}`}/>
        <br/>
        <br/>
        <Button
          text={ this.props.isRunning ? "Pause" : "Start" }
          onClick={ this.props.isRunning ? this.pause : this.start }
        />
        <br/>
        <button
          onMouseDown={ this.longPressResetStart }
          onMouseUp={ this.longPressResetEnd }
        >
        { this.getResetCountDownText() }
        </button>
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
}

StopWatch.defaultProps = {
  resetCountDownTime: 3000, // long press 3s to be able to reset
}


// Redux handling
const mapStateToProps = state => ({
  timing: state.stopWatchReducer.timing,
  resetCountedDown: state.stopWatchReducer.resetCountedDown,
  isRunning: state.stopWatchReducer.isRunning,
})

const mapDispatchToProps = dispatch => ({
  updateTiming: bindActionCreators(updateTiming, dispatch),
  updateResetCountDown: bindActionCreators(updateResetCountDown, dispatch),
  setIsRunning: bindActionCreators(setIsRunning, dispatch),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StopWatch)
