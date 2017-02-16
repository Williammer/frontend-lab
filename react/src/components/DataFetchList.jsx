import React, { PropTypes, Component } from 'react'
import axios from 'axios'

class RepoListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: '',
      repos: [],
      isFetching: false
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.getFilteredRepo = this.getFilteredRepo.bind(this);
  }

  static propTypes = {
    fetch: PropTypes.func,
    username: PropTypes.string.isRequired,
  }

  static defaultProps = {
    fetch: axios.get,
    username: 'Williammer'
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

  handleUserInput(value) {
    this.setState({
      searchKeyword: value
    });
  }

  getFilteredRepo() {
    const { repos, searchKeyword } = this.state;
    return repos.filter((repo) => repo.name.includes(searchKeyword));
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

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.inputSearch = this.inputSearch.bind(this);
  }

  static PropTypes = {
    onUserInput: PropTypes.func.isRequired
  }

  inputSearch(evt) {
    const val = evt.target.value;

    this.props.onUserInput(val);
  }

  render() {
    return (
      <div>
        <label htmlFor="searchbar">
          Search:
        </label>
        <input
          name="searchbar"
          type="text"
          onChange={this.inputSearch}
        />
      </div>
    );
  }
}

function NoResult() {
  return (
    <div>
      "no result"
    </div>
  );
}

class RepoList extends Component {
  static PropTypes = {
    username: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired
  }

  render() {
    const { username, repos } = this.props;

    return (
      <div>
        <h1>Repos of {username}:</h1>
        <ul>{renderDataToList(repos)}</ul>
      </div>
    )
  }
}

function renderDataToList(data) {
  let result = [];
  if (data && data.length > 0) {
    result = data.map((repo) => <li key={repo.id}>{repo.name}</li>);
  }

  return result;
}


export default RepoListContainer
