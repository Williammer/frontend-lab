import React, { Component } from "react";
import { NavLink, Route, Switch, BrowserRouter } from "react-router-dom";
import Welcome from "./containers/Welcome";
import StopWatch from "./containers/StopWatch";
import SampleForm from "./containers/SampleForm";
import RepoList from "./containers/DataFetchList";
import TypeWriter from "./containers/TypeWriter";
import TicTacToe from "./containers/TicTacToe";
import logo from "./logo.svg";
import "./css/App.css";

const typeWriterContainer = () => {
  const str =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices dolor ac dolor imperdiet ullamcorper. Suspendisse quam libero, luctus auctor mollis sed, malesuada condimentum magna. Quisque in ante tellus, in placerat est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec a mi magna, quis mattis dolor. Etiam sit amet ligula quis urna auctor imperdiet nec faucibus ante. Mauri";
  const speed = 20;
  // [Todo] how to handle these config inputs more nicely?
  return TypeWriter(str, speed);
};

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
                <NavLink to="/repoList">repoList</NavLink>
              </li>
              <li>
                <NavLink to="/stopWatch">stopWatch</NavLink>
              </li>
              <li>
                <NavLink to="/form">sampleForm</NavLink>
              </li>
              <li>
                <NavLink to="/typeWriter">typeWriter</NavLink>
              </li>
              <li>
                <NavLink to="/ticTacToe">ticTacToeGame</NavLink>
              </li>
            </ul>
          </div>
          <div className="App-main">
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route
                path="/repoList"
                component={() => <RepoList username="Williammer" />}
              />
              <Route path="/stopWatch" component={StopWatch} />
              <Route path="/form" component={SampleForm} />
              <Route path="/typeWriter" component={typeWriterContainer} />
              <Route path="/ticTacToe" component={TicTacToe} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
