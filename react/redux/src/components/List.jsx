import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class List extends PureComponent {
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
