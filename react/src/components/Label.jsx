import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Label extends Component {
  render() {
    return (
      <span className={`label ${this.props.styleClass}`}>
				{this.props.text}
			</span>
    );
  }
}

Label.propTypes = {
  styleClass: PropTypes.string,
  text: PropTypes.string
};

export default Label;
