import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class List extends Component {
  isSameList(a, b) {
    if (a.length !== b.length) return false;
    return a.every((aItem, index) => aItem === b[index]);
  }

  shouldComponentUpdate(nextProps) {
    if (this.isSameList(nextProps.list, this.props.list)) return false;
    return true;
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
