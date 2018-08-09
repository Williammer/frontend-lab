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
  // loadUserRepos,
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
        <h1>Repos of {username}:</h1>
        <ul className="repo-list">{renderDataToList(repos)}</ul>
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
    this.props.fetchUserRepos(username);
    // this.props.updateUsername(username);
    // this.props.loadUserRepos(username);
  }

  getSearchedRepo() {
    const { repos } = this.props;
    return repos.filter(repo => repo.includes(this.props.searchKeyword));
  }

  componentDidMount() {
    this.fetchRepos(this.props.username);
  }

  componentWillUnmount() {
    // TODO: cancel fetching request upon unmount
    this.props.updateSearchKeyword('');
    this.props.updateRepos([]);
  }

  render() {
    const { username, repos, isFetching, error } = this.props;
    if (isFetching) return <Fetching />;

    return (
      <div>
        <label htmlFor="username">
          Get repos of a hacker:
          <input
            name="username"
            ref={input => (this.usernameInput = input)}
            onKeyPress={this.onUsernameKeyPress}
          />
        </label>
        <Button text="GO" onClick={this.onUsernameBtnClick} />
        <br />
        <br />
        {username && repos && repos.length ? (
          <div>
            <SearchBar
              onUserInput={this.updateKeyword}
              label="Search for certain repo:"
            />
            <RepoList username={username} repos={this.getSearchedRepo()} />
          </div>
        ) : (
          <NoResult username={username} error={error} />
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
  const { username, error } = props;

  return (
    <div>
      <span className="label-no-repo">{username + ': no repo :/'}</span>
      <br />
      {error && <span className="label-error">{'error: ' + error}</span>}
    </div>
  );
}

function Fetching() {
  return <span>fetching...</span>;
}

function renderDataToList(data) {
  let result = [];
  if (data && data.length) {
    result = data.map((repo, index) => <li key={index}>{repo}</li>);
  }
  return result;
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
      // loadUserRepos,
      updateRepos,
      updateSearchKeyword,
      updateUsername,
      fetchUserRepos,
    },
  )(GithubUserList),
);
