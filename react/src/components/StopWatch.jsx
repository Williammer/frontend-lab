import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from './Label';
import Button from './Button';
// import './StopWatch.css';

class StopWatch extends Component {
  // timers
  _stopWatchTimer = null;
  _longpressDelay = null;
  _countProgressTimer = null;

  constructor(props) {
    super(props);

    this.state = {
      timing: 0,
      resetCountedDown: 0,
      isRunning: false
    };

    this.startTiming = this.startTiming.bind(this);
    this.pauseTiming = this.pauseTiming.bind(this);
    this.resetTiming = this.resetTiming.bind(this);
    this.startLongPressReset = this.startLongPressReset.bind(this);
    this.endLongPressReset = this.endLongPressReset.bind(this);
    this.reset = this.reset.bind(this);
  }

  startTiming() {
    const now = Date.now() - this.state.timing;

    this._stopWatchTimer = window.setInterval(
      function() {
        this.setState((prevState, props) => {
          return {
            timing: Date.now() - now,
            isRunning: true
          };
        });
      }.bind(this)
    );
  }

  pauseTiming() {
    this.clearStopWatchTimer();
    this.setState((prevState, props) => {
      return {
        isRunning: false
      };
    });
  }

  resetTiming() {
    this.clearStopWatchTimer();
    this.setState((prevState, props) => {
      return {
        timing: 0,
        isRunning: false
      };
    });
  }

  startLongPressReset() {
    if (this.state.timing === 0) {
      return;
    }

    this.showCountProgress(Date.now());
  }

  endLongPressReset() {
    const remain = this.props.resetCountDownTime - this.state.resetCountedDown;
    if (remain <= 0) {
      this.resetTiming();
    }

    this.clearLongpressDelay();
    this.resetCountProgress();
  }

  reset() {
    this.resetTiming();
    this.resetCountProgress();
    this.clearLongpressDelay();
  }

  getResetCountDownText() {
    const remain = this.props.resetCountDownTime - this.state.resetCountedDown;
    return remain > 0
      ? `LongPress ${Math.ceil(remain / 1000)} secs to reset`
      : "Ready to reset";
  }

  showCountProgress(now) {
    this._countProgressTimer = window.setInterval(
      function() {
        if (Date.now() - now <= 0) {
          // clear interval if reached countdown end
          this.clearCountProgressTimer();
          return;
        }

        this.setState((prevState, props) => {
          return {
            resetCountedDown: Date.now() - now
          };
        });
      }.bind(this),
      500
    );
  }

  resetCountProgress() {
    this.clearCountProgressTimer();

    this.setState((prevState, props) => {
      return {
        resetCountedDown: 0
      };
    });
  }

  clearStopWatchTimer() {
    if (this._stopWatchTimer) {
      clearInterval(this._stopWatchTimer);
      this._stopWatchTimer = null;
    }
  }

  clearLongpressDelay() {
    if (this._longpressDelay) {
      window.clearTimeout(this._longpressDelay);
      this._longpressDelay = null;
    }
  }

  clearCountProgressTimer() {
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
        <Label styleClass="timing" text={`${this.state.timing}ms`} />
        <br />
        <Label
          styleClass="isRunning"
          text={`isRunning: ${this.state.isRunning}`}
        />
        <br />
        <br />
        <Button
          text={this.state.isRunning ? "Pause" : "Start"}
          onClick={this.state.isRunning ? this.pauseTiming : this.startTiming}
        />
        <br />
        <button
          onMouseDown={this.startLongPressReset}
          onMouseUp={this.endLongPressReset}
        >
          {this.getResetCountDownText()}
        </button>
      </div>
    );
  }
}


StopWatch.propTypes = {
  resetCountDownTime: PropTypes.number.isRequired
}
StopWatch.defaultProps = {
  resetCountDownTime: 3000
}

export default StopWatch;
