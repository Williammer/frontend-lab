import React, { PropTypes, Component } from 'react'
import axios from 'axios'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  updateSearchKeyword,
  setIsFetching,
  updateRepos
} from '../actions'


function NoResult() {
  return (
    <div>
      "no result"
    </div>
  );
}

function renderDataToList(data) {
  let result = [];
  if (data && data.length > 0) {
    result = data.map((repo) => <li key={repo.id}>{repo.name}</li>);
  }

  return result;
}


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
    this.props.onUserInput(val);
  }

  render() {
    return (
      <div>
        <input
          name="searchbar"
          type="text"
          placeholder="Search..."
          onChange={this.inputSearch}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onUserInput: PropTypes.func.isRequired
}


/**
 * RepoList Component
 */
class RepoList extends Component {
  render() {
    const { username, repos } = this.props;

    return (
      <div>
        <h1>Repos of {username}:</h1>
        <ul className="repo-list">{renderDataToList(repos)}</ul>
      </div>
    )
  }
}

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired
}


/**
 * DataFetchList Component
 */
class DataFetchList extends Component {
  constructor(props) {
    super(props);

    this.handleUserInput = this.handleUserInput.bind(this);
    this.getFilteredRepo = this.getFilteredRepo.bind(this);
  }

  handleUserInput(value) {
    this.props.updateSearchKeyword(value);
  }

  getFilteredRepo() {
    const { repos } = this.props;
    return repos.filter((repo) => repo.name.includes(this.props.searchKeyword));
  }

  fetchRepos(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    this.props.setIsFetching(true);

    return this.props.fetch(apiUrl).then(({ data: repos }) => {
      console.log(`[fetch] success...`, repos);

      this.props.updateRepos(repos);
      this.props.setIsFetching(false);
    }, (error) => {
      this.props.setIsFetching(false);
      console.warn(`[fetch] error... ${error.message}`);
    });
  }

  componentDidMount() {
    this.fetchRepos(this.props.username);
  }

  render() {
    const { isFetching, repos } = this.props;

    return (
      <div>
        {
          isFetching ? <span>fetching...</span> :
            (repos && repos.length) ?
              <div>
                <SearchBar
                  onUserInput={this.handleUserInput}
                />
                <RepoList
                  username={this.props.username}
                  repos={this.getFilteredRepo()}
                />
              </div>
            : <NoResult />
        }
      </div>
    )
  }
}

DataFetchList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired,
  isFetching: PropTypes.bool.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
  updateRepos: PropTypes.func.isRequired,
  updateSearchKeyword: PropTypes.func.isRequired,
  setIsFetching: PropTypes.func.isRequired,
}

DataFetchList.defaultProps = {
  username: 'Williammer',
  fetch: axios.get,
}


// Redux handling
const mapStateToProps = state => ({
  repos: state.dataFetchListReducer.repos,
  isFetching: state.dataFetchListReducer.isFetching,
  searchKeyword: state.dataFetchListReducer.searchKeyword,
})

const mapDispatchToProps = dispatch => ({
  updateRepos: bindActionCreators(updateRepos, dispatch),
  updateSearchKeyword: bindActionCreators(updateSearchKeyword, dispatch),
  setIsFetching: bindActionCreators(setIsFetching, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataFetchList)
