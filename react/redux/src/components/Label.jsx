import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Label extends Component {
  render() {
    return (
      <span className={`label ${this.props.customClass}`}>
				{this.props.text}
			</span>
    );
  }
}

Label.propTypes = {
  text: PropTypes.string
}

export default Label;
