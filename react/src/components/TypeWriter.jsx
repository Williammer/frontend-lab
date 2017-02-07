import React, { Component, PropTypes } from 'react';
import Button from './Button';

class TypeWriter extends Component {
  state = {
    typedPos: 0,
    isRunning: false,
    finished: false
  }

  _typingInterval = null

  constructor(props) {
    super(props);
    this.startTyping = this.startTyping.bind(this);
    this.stopTyping = this.stopTyping.bind(this);
    this.pauseTyping = this.pauseTyping.bind(this);
    this.restartTyping = this.restartTyping.bind(this);
  }

  startTyping() {
    this._typingInterval = window.setInterval(() => {
      if (this.state.typedPos >= this.props.inputStr.length) {
        this.stopTyping();
        return;
      }

      this.setState((prevState, props) => {
        return {
          isRunning: true,
          typedPos: prevState.typedPos + 1
        };
      });
    }, this.props.speed);
  }

  pauseTyping() {
    if (this._typingInterval) {
      window.clearInterval(this._typingInterval);
      this._typingInterval = null;
    }

    this.setState({
      isRunning: false
    });
  }

  stopTyping() {
    this.pauseTyping();
    this.setState({
      typedPos: 0,
      finished: true
    });
  }

  restartTyping() {
    this.setState({
      typedPos: 0,
      finished: false
    }, this.startTyping);
  }

  componentDidMount() {
    this.startTyping();
  }

  componentWillUnmount() {
    this.stopTyping();
  }

  render() {
    return (
      <div>
        <p className='typeParagraph'>
          {this.state.finished ? this.props.inputStr : this.props.inputStr.slice(0, this.state.typedPos)}
        </p>
        <Button
          text={this.state.finished ? 'Restart' : this.state.isRunning ? 'Pause' : 'Resume'}
          onClick={this.state.finished ? this.restartTyping : this.state.isRunning ? this.pauseTyping : this.startTyping}
        />
      </div>
    )
  }
};

TypeWriter.propTypes = {
  inputStr: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};

TypeWriter.defaultProps = {
  inputStr: "This is default string.",
  speed: 100
};

function TypeWriterContainer(inputStr, speed) {
  return (
    <TypeWriter inputStr={inputStr} speed={speed} />
  );
}

export default TypeWriterContainer;
