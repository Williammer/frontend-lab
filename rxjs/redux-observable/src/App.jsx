import React, { Component } from 'react';
import { NavLink, Route, Switch, BrowserRouter } from 'react-router-dom';
import Welcome from './containers/Welcome';
import TicTacToe from './containers/TicTacToe';
import logo from './logo.svg';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
            <NavLink to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </NavLink>
            <ul className="App-router">
              <li>
                <NavLink to="/ticTacToe">ticTacToeGame</NavLink>
              </li>
            </ul>
          </div>
          <div className="App-main">
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route path="/ticTacToe" component={TicTacToe} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
