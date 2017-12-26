import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
}

export default Button;
