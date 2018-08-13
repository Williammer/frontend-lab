import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class SearchBar extends PureComponent {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
    this.onKeyPress = this.onKeyPress.bind(this);

    const { debounce: debounceTime = 0 } = props;
    this.search = this.search.bind(this);
    this.searchDebounced = debounceTime > 0 ? debounce(this.search, debounceTime) : this.search;
  }

  onKeyPress({ key }) {
    if (key === 'Enter') {
      this.search();
    }
  }

  search() {
    const value = this.searchInput.current.value;
    this.props.searchHandler(value);
  }

  componentWillUnmount() {
    if (this.props.debounceTime > 0) {
      this.searchDebounced.cancel();
    }
  }

  render() {
    const { name, label, instant, placeholder } = this.props;
    return (
      <div>
          <label htmlFor={name}>
            {`${label} `}
          </label>
          <TextField
            name={name}
            margin="normal"
            inputRef={this.searchInput}
            onChange={!instant ? null : this.searchDebounced}
            onKeyPress={instant ? null : this.onKeyPress}
            placeholder={placeholder}
          />{' '}
        {instant ? null : (
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={this.search}>
            Search
          </Button>
        )}
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
