import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

export default class List extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.list, this.props.list);
  }

  render() {
    const { list, renderHeader } = this.props;
    return (
      <div>
        {renderHeader()}
        <ul className="list">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}
List.propTypes = {
  list: PropTypes.array.isRequired,
  renderHeader: PropTypes.func.isRequired,
};
List.defaultProps = {
  list: [],
  renderHeader: () => {},
};
