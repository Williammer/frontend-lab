import React, { Component } from 'react';
import { NavLink, Route, Switch, BrowserRouter } from 'react-router-dom';
import Welcome from './containers/Welcome';
import StopWatch from './containers/StopWatch';
import SampleForm from './containers/SampleForm';
import RepoList from './containers/GithubUserList';
import TypeWriter from './containers/TypeWriter';
import TicTacToe from './containers/TicTacToe';
import Collapsible from './containers/Collapsible';
import Draggable from './containers/Draggable';
import Counters from './containers/Counters';
import logo from './logo.svg';
import './css/App.css';

const TypeWriterDemo = () => {
  const str =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices dolor ac dolor imperdiet ullamcorper. Suspendisse quam libero, luctus auctor mollis sed, malesuada condimentum magna. Quisque in ante tellus, in placerat est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec a mi magna, quis mattis dolor. Etiam sit amet ligula quis urna auctor imperdiet nec faucibus ante. Mauri';
  const speed = 20;
  // [Todo] how to handle these config inputs more nicely?
  return TypeWriter(str, speed);
};

const menus = [
  {
    path: '/frontend-lab/repoList',
    title: 'Repo list',
    component: RepoList,
  },
  {
    path: '/frontend-lab/stopWatch',
    title: 'Stop watch',
    component: StopWatch,
  },
  {
    path: '/frontend-lab/form',
    title: 'Form sample',
    component: SampleForm,
  },
  {
    path: '/frontend-lab/typeWriter',
    title: 'Type writer',
    component: TypeWriterDemo,
  },
  {
    path: '/frontend-lab/ticTacToe',
    title: 'TicTacToe game',
    component: TicTacToe,
  },
  {
    path: '/frontend-lab/collapsible',
    title: 'Collapsible',
    component: Collapsible,
  },
  {
    path: '/frontend-lab/draggable',
    title: 'Draggable',
    component: Draggable,
  },
  {
    path: '/frontend-lab/counters',
    title: 'Counters',
    component: Counters,
  },
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
