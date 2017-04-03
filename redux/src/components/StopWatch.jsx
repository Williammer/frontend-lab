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
    this._longPressResetStart = this._longPressResetStart.bind(this);
    this._longPressResetEnd = this._longPressResetEnd.bind(this);
  }

  _stopWatchTimer = null
  _longpressDelay = null
  _countProgressTimer = null

  _now = 0
  _readyToReset = false

  start() {
    this._now = Date.now() - this.props.timing;

    this._stopWatchTimer = window.setInterval(function(){
      this.props.updateTiming(Date.now() - this._now);
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

  _longPressResetStart() {
    if (this.props.timing === 0) {
      return;
    }

    const now = Date.now();

    this._longpressDelay = window.setTimeout(function() {
      this._readyToReset = true;
    }.bind(this), this.props.resetCountDownTime);

    this._showCountProgress(now);
  }

  _longPressResetEnd() {
    this.__clearLongpressDelay();

    if (this._readyToReset) {
      this._readyToReset = false;
      this.reset();
    }

    this._resetCountProgress();
  }

  _showCountProgress(now) {
    this._countProgressTimer = window.setInterval(function() {
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

  _getResetCountDownText() {
    const remain = this.props.resetCountDownTime - this.props.resetCountedDown;
    return remain ? `LongPress ${Math.ceil(remain / 1000)} secs to reset` : 'Ready to reset';
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
          text={this.props.isRunning
          ? "Pause"
          : "Start"}
          onClick={this.props.isRunning
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
  isRunning: PropTypes.bool.isRequired,
  updateTiming: PropTypes.func.isRequired,
  updateResetCountDown: PropTypes.func.isRequired,
}

StopWatch.defaultProps = {
  resetCountDownTime: 3000,
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
