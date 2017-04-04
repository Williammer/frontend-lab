import React, { PropTypes, Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
// import { loadRepo, loadStargazers } from '../actions'

class DataFetchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      isFetching: false
    };
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
              <SearchableList
                repos={repos}
                username={this.props.username}
              />
            : <NoResult />
        }
      </div>
    )
  }
}

class SearchableList extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const { repos } = this.props;
    return repos.filter((repo) => repo.name.includes(this.state.searchKeyword));
  }

  render() {
    return (
      <div>
        <SearchBar
          onUserInput={this.handleUserInput}
        />
        <RepoList
          username={this.props.username}
          repos={this.getFilteredRepo()}
        />
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
        <ul className="repo-list">{renderDataToList(repos)}</ul>
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


export default DataFetchList

// const mapStateToProps = (state, ownProps) => {
//   // We need to lower case the login/name due to the way GitHub's API behaves.
//   // Have a look at ../middleware/api.js for more details.
//   const login = ownProps.params.login.toLowerCase()
//   const name = ownProps.params.name.toLowerCase()

//   const {
//     pagination: { stargazersByRepo },
//     entities: { users, repos }
//   } = state

//   const fullName = `${login}/${name}`
//   const stargazersPagination = stargazersByRepo[fullName] || { ids: [] }
//   const stargazers = stargazersPagination.ids.map(id => users[id])

//   return {
//     fullName,
//     name,
//     stargazers,
//     stargazersPagination,
//     repo: repos[fullName],
//     owner: users[login]
//   }
// }

// export default connect(mapStateToProps, {
//   loadRepo,
//   loadStargazers
// })(RepoPage)
