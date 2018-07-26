import React, { Component } from "react";
import { NavLink, Route, Switch, BrowserRouter } from "react-router-dom";
import Welcome from "./components/Welcome";
import StopWatch from "./components/StopWatch";
import SampleForm from "./components/SampleForm";
import RepoList from "./components/DataFetchList";
import TypeWriter from "./components/TypeWriter";
import TicTacToe from "./components/TicTacToe";
import Collapsible from "./components/Collapsible";
import Draggable from "./components/Draggable";
import logo from "./logo.svg";
import "./css/App.css";

const TypeWriterDemo = () => {
  const str =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices dolor ac dolor imperdiet ullamcorper. Suspendisse quam libero, luctus auctor mollis sed, malesuada condimentum magna. Quisque in ante tellus, in placerat est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec a mi magna, quis mattis dolor. Etiam sit amet ligula quis urna auctor imperdiet nec faucibus ante. Mauri";
  const speed = 20;
  return TypeWriter(str, speed);
};

const RepoListDemo = () => <RepoList username="Williammer" />;

const menus = [
  {
    path: "/frontend-lab/repoList",
    title: "Repo list",
    component: RepoListDemo
  },
  {
    path: "/frontend-lab/stopWatch",
    title: "Stop watch",
    component: StopWatch
  },
  {
    path: "/frontend-lab/form",
    title: "Form sample",
    component: SampleForm
  },
  {
    path: "/frontend-lab/typeWriter",
    title: "Type writer",
    component: TypeWriterDemo
  },
  {
    path: "/frontend-lab/ticTacToe",
    title: "TicTacToe game",
    component: TicTacToe
  },
  {
    path: "/frontend-lab/collapsible",
    title: "Collapsible",
    component: Collapsible
  },
  {
    path: "/frontend-lab/draggable",
    title: "Draggable",
    component: Draggable
  }
];

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
            <NavLink to="/frontend-lab">
              <img src={logo} className="App-logo" alt="logo" />
            </NavLink>
            <ul className="App-router">
              {menus.map(({ path, title }) => (
                <li key={path}>
                  <NavLink to={path}>{title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="App-main">
            <Switch>
              <Route exact path="/frontend-lab" component={Welcome} />
              {menus.map(({ path, component }) => (
                <Route key={path} path={path} component={component} />
              ))}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
