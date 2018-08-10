import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
    this.search = this.search.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.search(e.target.value);
    }
  }

  search() {
    const value = this.searchInput.current.value;
    // TODO: how to handle throttle?
    this.props.searchHandler(value);
  }

  render() {
    const { name, label, instant, placeholder } = this.props;
    return (
      <div>
        <label htmlFor={name}>
          {label}
          <input
            name={name}
            type="text"
            ref={this.searchInput}
            onChange={instant ? this.search : null}
            onKeyPress={instant ? null : this.onKeyPress}
            placeholder={placeholder}
          />
        </label>
        {instant ? null : <Button text="Search" onClick={this.search} />}
      </div>
    );
  }
}
SearchBar.propTypes = {
  instant: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
};
SearchBar.defaultProps = {
  placeholder: 'input to search',
  instant: false,
  label: '',
  name: '',
  searchHandler: () => {},
};
