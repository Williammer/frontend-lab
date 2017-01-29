import React, { PropTypes, Component } from 'react'
import axios from 'axios'

class DataFetchList extends Component {
    state = {
        repos: [],
        isFetching: false
    }

    static propTypes = {
        username: PropTypes.string.isRequired,
        fetch: PropTypes.func,
    }

    static defaultProps = {
        fetch: axios.get,
        username: 'Williammer'
    }

    componentDidMount() {
        this.fetchRepos(this.props.username);
    }

    fetchRepos(username) {
        const apiUrl = `https://api.github.com/users/${username}/repos`;

        this.setState({ isFetching: true });
        return this.props.fetch(apiUrl).then(({ data: repos }) => {
            console.log(`[fetch] success... ${repos}`, repos);
            this.setState({
                repos,
                isFetching: false
            })
        }, (error) => {
            this.setState({ isFetching: false });
            console.warn(`[fetch] error... ${error.message}`);
        });
    }

    render() {
        const { repos } = this.state;
        return (
            <div>
                {this.state.isFetching ? <span>fetching...</span>: null}
            {
                repos && repos.length > 0 ?
                <RepoList username={this.props.username} repos={repos} />
                : null
            }
        </div>
        )
    }
}

function _getRepoList(repos) {
    let result = [];
    if (repos && repos.length > 0) {
        result = repos.map((repo) => <li key={repo.id}>{repo.name}</li>);
    }

    return result;
}

function RepoList({ username, repos }) {
    return (
        <div>
            <h1>{username}'s repo:</h1>
             <ul>{_getRepoList(repos)}</ul>
          </div>
    )
}

RepoList.PropTypes = {
    username: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired
}

export default DataFetchList
