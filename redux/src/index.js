import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, syncHistoryWithStore } from 'react-router-redux';
import { defaultState } from './store/defaultState';
import configureStore from './store/configureStore';
import App from './App';
import './index.css'


const store = configureStore(defaultState);
const history = syncHistoryWithStore(createBrowserHistory(), store);

// TODO: extract to routes.js
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
