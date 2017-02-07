import React, { Component } from 'react';
import NavLink from './components/NavLink'
import logo from './logo.svg'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <NavLink to="/">
            <img
              src={logo}
              className="App-logo"
              alt="logo"
            />
          </NavLink>
          <ul role="nav" className="App-router">
            <li><NavLink to="/repoList">repoList</NavLink></li>
            <li><NavLink to="/stopWatch">stopWatch</NavLink></li>
            <li><NavLink to="/nameForm">nameForm</NavLink></li>
            <li><NavLink to="/typeWriter">typeWriter</NavLink></li>
          </ul>
        </div>
        <div className="App-main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
