import React, { Component, PropTypes } from 'react';
import Label from './Label';
import Button from './Button';
// import './StopWatch.css';

class StopWatch extends Component {
  state = {
    timing: 0,
    isRunning: false
  }

  _timer = null
  _now = 0

  start = () => {
    this._timer = setInterval(() => {
      this.setState({
        timing: Date.now() - this._now
      });
    });
    this._now = Date.now() - this.state.timing;

    this.setState({ isRunning: true });
  }

  pause = () => {
    clearInterval(this._timer);
    this._timer = null;

    this.setState({ isRunning: false });
  }

  reset = () => {
    clearInterval(this._timer);
    this._timer = null;

    this.setState({ timing: 0, isRunning: false });
  }

  componentWillUnmount() {
    this.reset();
  }

  render() {
    return (
      <div>
        <Label text={`${this.state.timing}ms`}/>
        <br/>
        <Label text={`isRunning: ${this.state.isRunning}`}/>
        <br/>
        <br/>
        <Button
          text={this.state.isRunning
          ? "Pause"
          : "Start"}
          onClick={this.state.isRunning
          ? this.pause
          : this.start}/>
        <Button text="Reset" onClick={this.reset}/>
      </div>
    );
  }
}

StopWatch.PropTypes = {
  timing: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired
}

export default StopWatch;
