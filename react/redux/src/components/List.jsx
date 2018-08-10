import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class List extends Component {
  compareList(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((aItem, index) => aItem === b[index]);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { repos } = this.props;

    if (this.compareList(nextProps.repos, repos)) {
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
List.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
