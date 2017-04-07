import React, { PropTypes, Component } from 'react';
import Button from '../components/Button';
import axios from 'axios';

import { connect } from 'react-redux';
import {
  updateSearchKeyword,
  updateUsername,
  setIsFetching,
  updateRepos
} from '../actions';

/**
 * SearchBar Component
 */
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.inputSearch = this.inputSearch.bind(this);
  }

  inputSearch(evt) {
    const val = evt.target.value;
    // TODO: how to handle throttle?
    this.props.onUserInput(val);
  }

  render() {
    return (
      <div>
        <label htmlFor="searchbar">
          {this.props.label}
          <input name="searchbar" type="text" onChange={this.inputSearch} />
        </label>
      </div>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  placeholder: 'Search:'
};

/**
 * RepoList Component
 */
class RepoList extends Component {
  deepRepoCompare(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((aItem, index) => {
      return aItem.id === b[index].id;
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { repos } = this.props;

    if (this.deepRepoCompare(nextProps.repos, repos)) {
      return false;
    }

    return true;
  }

  render() {
    const { username, repos } = this.props;

    return (
      <div>
        <h1>Repos of {username}:</h1>
        <ul className="repo-list">{renderDataToList(repos)}</ul>
      </div>
    );
  }
}

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

/**
 * DataFetchList Component
 */
class DataFetchList extends Component {
  constructor(props) {
    super(props);

    this.updateKeyword = this.updateKeyword.bind(this);
    this.getSearchedRepo = this.getSearchedRepo.bind(this);
    this.handleUsernameKeyPress = this.handleUsernameKeyPress.bind(this);
    this.handleUsernameBtnClick = this.handleUsernameBtnClick.bind(this);
  }

  handleUsernameKeyPress(e) {
    if (e.key === 'Enter') {
      this.fetchRepos(e.target.value);
    }
  }

  handleUsernameBtnClick() {
    this.fetchRepos(this.usernameInput.value);
  }

  updateKeyword(value) {
    this.props.updateSearchKeyword(value);
  }

  fetchRepos(username) {
    if (!username) {
      this.props.updateRepos([]);
      return;
    }

    const apiUrl = `https://api.github.com/users/${username}/repos`;

    this.props.setIsFetching(true);
    this.props.updateUsername(username);

    return axios.get(apiUrl).then(
      (
        {
          data: repos
        }
      ) => {
        console.log('[fetch] success...', repos);
        this.props.updateRepos(this.filterRepoContent(repos));
        this.props.setIsFetching(false);
      },
      error => {
        console.warn('[fetch] error... ', error.message);
        this.props.updateRepos([]);
        this.props.setIsFetching(false);
      }
    );
  }

  filterRepoContent(repos) {
    return repos.map(repo => {
      return {
        id: repo.id,
        name: repo.name
      };
    });
  }

  getSearchedRepo() {
    const { repos } = this.props;
    return repos.filter(repo => repo.name.includes(this.props.searchKeyword));
  }

  componentDidMount() {
    this.fetchRepos(this.props.username);
  }

  componentWillUnmount() {
    this.props.updateSearchKeyword('');
    this.props.setIsFetching(false);
    this.props.updateRepos([]);
  }

  render() {
    const { username, repos, isFetching } = this.props;

    if (isFetching) {
      return <Fetching />;
    }

    return (
      <div>
        <label htmlFor="username">
          Get repos of a hacker:
          <input
            name="username"
            ref={input => this.usernameInput = input}
            onKeyPress={this.handleUsernameKeyPress}
          />
        </label>
        <Button text="GO" onClick={this.handleUsernameBtnClick} />
        <br />
        <br />
        {username && repos && repos.length
          ? <div>
              <SearchBar
                onUserInput={this.updateKeyword}
                label="Search for certain repo:"
              />
              <RepoList username={username} repos={this.getSearchedRepo()} />
            </div>
          : <NoResult username={username} />}
      </div>
    );
  }
}

DataFetchList.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  updateRepos: PropTypes.func.isRequired,
  updateSearchKeyword: PropTypes.func.isRequired,
  updateUsername: PropTypes.func.isRequired,
  setIsFetching: PropTypes.func.isRequired
};

function NoResult(props) {
  return <div>{props.username + ': no repo'}</div>;
}

function Fetching() {
  return <span>fetching...</span>;
}

function renderDataToList(data) {
  let result = [];
  if (data && data.length > 0) {
    result = data.map(repo => <li key={repo.id}>{repo.name}</li>);
  }

  return result;
}

// Redux handling
const mapStateToProps = state => ({
  repos: state.dataFetchListReducer.repos,
  username: state.dataFetchListReducer.username,
  isFetching: state.dataFetchListReducer.isFetching,
  searchKeyword: state.dataFetchListReducer.searchKeyword
});

export default connect(mapStateToProps, {
  updateRepos,
  updateSearchKeyword,
  updateUsername,
  setIsFetching
})(DataFetchList);
