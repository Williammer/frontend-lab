import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import List from '../components/List';
import '../css/GithubUserList.css';

import { connect } from 'react-redux';
import {
  updateSearchKeyword,
  updateUsername,
  fetchUserRepos,
  updateRepos,
} from '../actions';

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

class GithubUserList extends Component {
  constructor(props) {
    super(props);

    this.fetch = this.fetch.bind(this);
    this.filter = this.filter.bind(this);
    this.updateKeyword = this.updateKeyword.bind(this);
  }

  updateKeyword(keyword) {
    this.props.updateSearchKeyword(keyword);
  }

  fetch(username) {
    this.props.updateSearchKeyword('');
    this.props.updateUsername(username);
    if (!username) {
      this.props.updateRepos([]);
      return;
    }
    this.props.fetchUserRepos(username);
  }

  filter() {
    const { repos, searchKeyword } = this.props;
    return repos.filter(repo => repo.includes(searchKeyword));
  }

  componentWillUnmount() {
    this.props.updateUsername('');
    this.props.updateSearchKeyword('');
    this.props.updateRepos([]);
  }

  render() {
    const { username, repos, fetching, error } = this.props;
    return (
      <div>
        <SearchBar
          searchHandler={this.fetch}
          name="username"
          label="Get Github user repositories:"
        />
        {fetching ? (
          <Fetching />
        ) : !username.length ? null : repos.length ? (
          <div>
            <SearchBar
              searchHandler={this.updateKeyword}
              name="searchBar"
              label="Search certain repository:"
              placeholder="input to filter"
              instant
            />
            <List
              renderHeader={() => <h3>Repositories of {username}:</h3>}
              list={this.filter()}
            />
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
  fetching: PropTypes.bool.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  updateRepos: PropTypes.func.isRequired,
  updateSearchKeyword: PropTypes.func.isRequired,
  updateUsername: PropTypes.func.isRequired,
  fetchUserRepos: PropTypes.func.isRequired,
};

// Redux handling
const mapStateToProps = state => ({
  repos: state.dataFetchListReducer.repos,
  username: state.dataFetchListReducer.username,
  fetching: state.dataFetchListReducer.fetching,
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
