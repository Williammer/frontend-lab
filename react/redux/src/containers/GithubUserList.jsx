import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import '../css/GithubUserList.css';

import { connect } from 'react-redux';
import {
  updateSearchKeyword,
  updateUsername,
  fetchUserRepos,
  updateRepos,
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
  onUserInput: PropTypes.func.isRequired,
};
SearchBar.defaultProps = {
  placeholder: 'Search:',
};

/**
 * RepoList Component
 */
class RepoList extends Component {
  deepRepoCompare(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((aItem, index) => aItem === b[index]);
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
        <h1>Repositories of {username}:</h1>
        <ul className="repo-list">
          {repos.map((repo, index) => (
            <li key={index}>{repo}</li>
          ))}
        </ul>
      </div>
    );
  }
}
RepoList.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

/**
 * GithubUserList Component
 */
class GithubUserList extends Component {
  constructor(props) {
    super(props);

    this.usernameInput = React.createRef();
    this.updateKeyword = this.updateKeyword.bind(this);
    this.getSearchedRepo = this.getSearchedRepo.bind(this);
    this.onUsernameKeyPress = this.onUsernameKeyPress.bind(this);
    this.onUsernameBtnClick = this.onUsernameBtnClick.bind(this);
  }

  onUsernameKeyPress(e) {
    if (e.key === 'Enter') {
      this.fetchRepos(e.target.value);
    }
  }

  onUsernameBtnClick() {
    this.fetchRepos(this.usernameInput.current.value);
  }

  updateKeyword(value) {
    this.props.updateSearchKeyword(value);
  }

  fetchRepos(username) {
    this.props.updateUsername(username);
    if (!username) {
      this.props.updateRepos([]);
      return;
    }
    this.props.fetchUserRepos(username);
  }

  getSearchedRepo() {
    const { repos, searchKeyword } = this.props;
    return repos.filter(repo => repo.includes(searchKeyword));
  }

  componentWillUnmount() {
    this.props.updateUsername('');
    this.props.updateSearchKeyword('');
    this.props.updateRepos([]);
  }

  render() {
    const { username, repos, isFetching, error } = this.props;
    return (
      <div>
        <label htmlFor="username">
          Get the repositories of a Github user:
          <input
            name="username"
            ref={this.usernameInput}
            onKeyPress={this.onUsernameKeyPress}
          />
        </label>
        <Button text="Search" onClick={this.onUsernameBtnClick} />
        <br />
        <br />
        {isFetching ? (
          <Fetching />
        ) : !username.length ? null : repos.length ? (
          <div>
            <SearchBar
              onUserInput={this.updateKeyword}
              label="Search certain repository:"
            />
            <RepoList username={username} repos={this.getSearchedRepo()} />
          </div>
        ) : (
          <NoResult username={username} message={error} />
        )}
      </div>
    );
  }
}
GithubUserList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isFetching: PropTypes.bool.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  updateRepos: PropTypes.func.isRequired,
  updateSearchKeyword: PropTypes.func.isRequired,
  updateUsername: PropTypes.func.isRequired,
  fetchUserRepos: PropTypes.func.isRequired,
};

function NoResult(props) {
  return (
    <div>
      <span className="label-no-repo">
        {`No repository found for "${props.username}"`}
      </span>
      <br />
      <span className="label-error-message">
        {`Error message: ${props.message || ''}`}
      </span>
    </div>
  );
}

function Fetching() {
  return <span>fetching...</span>;
}

// Redux handling
const mapStateToProps = state => ({
  repos: state.dataFetchListReducer.repos,
  username: state.dataFetchListReducer.username,
  isFetching: state.dataFetchListReducer.isFetching,
  error: state.dataFetchListReducer.error,
  searchKeyword: state.dataFetchListReducer.searchKeyword,
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      updateRepos,
      updateSearchKeyword,
      updateUsername,
      fetchUserRepos,
    },
  )(GithubUserList),
);
