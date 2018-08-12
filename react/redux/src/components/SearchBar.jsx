import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Button from './Button';

export default class SearchBar extends PureComponent {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
    this.onKeyPress = this.onKeyPress.bind(this);

    const { debounce: debounceTime } = props;
    const search = this.search.bind(this);
    this.search = debounceTime > 0 ? debounce(search, debounceTime) : search;
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.search(e.target.value);
    }
  }

  search() {
    const value = this.searchInput.current.value;
    this.props.searchHandler(value);
  }

  componentWillUnmount() {
    if (this.props.debounceTime > 0) {
      this.search.cancel();
    }
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
