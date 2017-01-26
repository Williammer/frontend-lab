import React, { Component, PropTypes } from 'react';

class Button extends Component {
    render() {
        return (
            <button
	        className="stopwatch-button"
	        onClick={this.props.clickHandler}
	      >
	      	{this.props.text}
	      </button>
        );
    }
}

Button.PropTypes = {
    text: PropTypes.string,
    clickHandler: PropTypes.func.isRequired
}

export default Button;
