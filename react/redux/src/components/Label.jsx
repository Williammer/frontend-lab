import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Label extends PureComponent {
  render() {
    return (
      <span className={`label ${this.props.customClass}`}>
        {this.props.text}
      </span>
    );
  }
}

Label.propTypes = {
  text: PropTypes.string,
};

export default Label;
