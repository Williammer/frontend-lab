import React, { PropTypes, Component } from 'react'
// import axios from 'axios'
// for our data fetching needs, we're going to use axios.get (imported above)
//
// It is best not to fetch data from a server in the `render` method. As we
// saw in the last exercise any change to the state of a component can cause
// a re-render of the component. This will likely happen more often than we
// want. It is best to use another lifecycle method `componentDidMount` to
// make these requests. This method will be called once before the component
// is inserted into the document, regardless of how many times `render` is
// called.
//
// Example:
//
// ```
// class UserProfile extends Component {
//   state = {user: {}}
//   static propTypes = {
//     username: PropTypes.number.isRequired,
//     fetch: PropTypes.func,
//   }
//   static defaultProps = { fetch: axios.get } // doing this allows you to pass a mock version as a prop
//
//   componentDidMount() {
//     this.props.fetch(`/users/${this.props.username}`)
//       .then(
//         ({data: user}) => this.setState({user}),
//         // should add an error handler here :)
//       )
//   }
//
//   render() {
//     const {user} = this.state
//     return (
//       <div>
//         <div>First name: {user.firstName}</div>
//         <div>Last name: {user.lastName}</div>
//         <div>Email address: {user.emailAddress}</div>
//       </div>
//     )
//   }
// }
//
// UserProfile.propTypes = {
//   username: PropTypes.number.isRequired
// }
// ```
//
// See https://facebook.github.io/react/docs/component-specs.html
//
// Exercise:
//
//  Create a `DataFetchList` component that lists all the GitHub repos for a user.
//  Allow the user to be provided as a prop.
//
//  https://api.github.com/users/{username}/repos
//
// Tip:
// - You may end up getting throttled by GitHub if you keep refreshing and making unauthenticated requests to their API
//   to avoid this, I recommend you return some fake data in `componentDidMount` and only implement that when you're
//   done with everything else.

class DataFetchList extends Component {
    state = {
      repos: [{ id: 12345, name: 'turbo-sniffle' },
                        { id: 54321, name: 'ubiquitous-succotash' },
                        { id: 43234, name: 'solid-waffle' },]
    }

    // componentDidMount() {
    //   mockFetch().then((response) => {
    //     // this.setState({repos: response.data});
    //   }).fail((error) => {
    //     console.warn(`error... ${error.message}`);
    //   });
    // }

    _processRepos(repos) {
        if (repos && repos.length > 0) {
          repos.map((repo) => <li>{repo.name}</li>);
        }
    }
    render() {
        const {repos} = this.state;

        return (
          <div>
           {/* {RepoList({username: 'Williammer', repos: this.state.repos})}*/}
            {
              repos && repos.length > 0 ?
              (<ul>{repos}</ul>) :
              (<span> No shit. </span>)
            }
          </div>
        )
    }
}

function RepoList({username, repos}) {
    if (repos && repos.length > 0) {
      repos.map((repo) => <li>{repo.name}</li>);
    }
    return (
        <div>
        {
          repos && repos.length > 0 ?
          (<ul>{repos}</ul>) :
          (<span> No shit. </span>)
        }
        </div>
    )
}
RepoList.propTypes = {
    // add prop types for username and repos
}

// This is for you. Merry Christmas 🎅 🎄 🎁
function mockFetch() {
    const delay = 1000 // set this to `Number.MAX_VALUE` test the loading state
    const sendError = false // set this to `true` to test out the error state
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (sendError) {
                reject({
                    message: 'Something went wrong',
                    status: 500,
                })
            } else {
                resolve({
                    data: [
                        { id: 12345, name: 'turbo-sniffle' },
                        { id: 54321, name: 'ubiquitous-succotash' },
                        { id: 43234, name: 'solid-waffle' },
                    ]
                })
            }
        }, delay)
    })
}

export default DataFetchList
