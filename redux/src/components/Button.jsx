import React, { Component, PropTypes } from 'react';

class Button extends Component {
  render() {
    return (
      <button
        className="stopwatch-button"
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

Button.PropTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default Button;
