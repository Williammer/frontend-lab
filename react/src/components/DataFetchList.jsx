import React, { PropTypes, Component } from 'react'
import axios from 'axios'


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

    this.state = {
      repos: [],
      isFetching: false,
      searchKeyword: ''
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.getFilteredRepo = this.getFilteredRepo.bind(this);
  }

  handleUserInput(value) {
    this.setState({
      searchKeyword: value
    });
  }

  getFilteredRepo() {
    const { repos } = this.state;
    return repos.filter((repo) => repo.name.includes(this.state.searchKeyword));
  }

  fetchRepos(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    this.setState({ isFetching: true });

    return this.props.fetch(apiUrl).then(({ data: repos }) => {
      console.log(`[fetch] success...`, repos);
      this.setState({
        repos,
        isFetching: false
      })
    }, (error) => {
      this.setState({ isFetching: false });
      console.warn(`[fetch] error... ${error.message}`);
    });
  }

  componentDidMount() {
    this.fetchRepos(this.props.username);
  }

  render() {
    const { isFetching, repos } = this.state;

    return (
      <div>
        {
          isFetching ? <span>fetching...</span> :
            (repos && repos.length > 0) ?
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
  fetch: PropTypes.func,
  username: PropTypes.string.isRequired,
}

DataFetchList.defaultProps = {
  fetch: axios.get,
  username: 'Williammer'
}


export default DataFetchList;
