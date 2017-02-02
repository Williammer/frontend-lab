import React, { Component, PropTypes } from 'react';
import Label from '../components/Label';
import Button from '../components/Button';
import Header from '../components/Header';
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

  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-main">
          <Label text={`${this.state.timing}ms`}/>
          <br/>
          <Label text={`isRunning: ${this.state.isRunning}`}/>
          <br/>
          <br/>
          <Button
            text={this.state.isRunning
            ? "Pause"
            : "Start"}
            clickHandler={this.state.isRunning
            ? this.pause
            : this.start}/>
          <Button text="Reset" clickHandler={this.reset}/>
        </div>

        <style jsx>{`
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }

          .App {
            text-align: center;
            font-family: serif;
          }

          .App-intro {
            font-size: large;
          }

          .App-main {
            margin-top: 40px;
          }
        `}</style>
      </div>
    );
  }
}

StopWatch.PropTypes = {
  timing: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired
}

export default StopWatch;
