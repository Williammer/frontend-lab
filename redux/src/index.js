import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, syncHistoryWithStore } from 'react-router-redux';
import { defaultState } from './store/defaultState';
import configureStore from './store/configureStore';

import App from './App';
import SampleForm from './containers/SampleForm';
import DataFetchList from './containers/DataFetchList';
import TypeWriter from './containers/TypeWriter';

// import Welcome from './containers/Welcome';
import TicTacToe from './containers/TicTacToe';
import StopWatch from './containers/StopWatch';
import './index.css'


const typeWriterContainer = () => {
  const str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices dolor ac dolor imperdiet ullamcorper. Suspendisse quam libero, luctus auctor mollis sed, malesuada condimentum magna. Quisque in ante tellus, in placerat est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec a mi magna, quis mattis dolor. Etiam sit amet ligula quis urna auctor imperdiet nec faucibus ante. Mauri';
  const speed = 20;
  // [Todo] how to handle these config inputs more nicely?
  return TypeWriter(str, speed);
}


const store = configureStore(defaultState);
const history = syncHistoryWithStore(createBrowserHistory(), store);

// TODO: extract to routes.js
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/repoList" component={DataFetchList} />
        <Route path="/stopWatch" component={StopWatch} />
        <Route path="/form" component={SampleForm} />
        <Route path="/typeWriter" component={typeWriterContainer} />
        <Route path="/ticTacToe" component={TicTacToe} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
