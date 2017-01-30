import React, { Component } from 'react';
import { Link } from 'react-router'
import logo from './logo.svg'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
            <div className="App-header">
                <Link to="/">
                    <img
                      src={logo}
                      className="App-logo"
                      alt="logo"
                    />
                </Link>
                <ul role="nav" className="App-router">
                    <li><Link to="/repoList">repoList</Link></li>
                    <li><Link to="/stopWatch">stopWatch</Link></li>
                    <li><Link to="/nameForm">nameForm</Link></li>
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
