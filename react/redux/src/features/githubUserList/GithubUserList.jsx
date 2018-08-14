import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SearchBar from '../../components/SearchBar';
import ItemList from '../../components/ItemList';
import './GithubUserList.css';

import { connect } from 'react-redux';
import {
  updateSearchKeyword,
  updateUsername,
  fetchUserRepos,
  updateRepos,
} from './githubUserListActions';

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

const styles = theme => ({
  container: {
    width: 600,
    margin: '20px auto',
    paddingTop: 10,
    paddingBottom: 30,
  },
});

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
    const { classes, username, repos, fetching, error } = this.props;
    return (
      <Paper className={classes.container} elevation={1}>
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
              debounce="1000"
              instant
            />
            <ItemList
              renderHeader={() => <h3>Repositories of {username}:</h3>}
              list={this.filter()}
            />
          </div>
        ) : (
          <NoResult username={username} message={error} />
        )}
      </Paper>
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
  repos: state.githubUserListReducer.repos,
  username: state.githubUserListReducer.username,
  fetching: state.githubUserListReducer.fetching,
  error: state.githubUserListReducer.error,
  searchKeyword: state.githubUserListReducer.searchKeyword,
});

export default withStyles(styles)(
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
