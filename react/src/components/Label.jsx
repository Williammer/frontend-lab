import React, { Component, PropTypes } from 'react';

class Label extends Component {
    render() {
        return (
            <span className="stopwatch-timing" >
				{this.props.text}
			</span>
        );
    }
}

Label.PropTypes = {
    text: PropTypes.string
}

export default Label;
