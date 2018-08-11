import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { defaultState } from './core/store/defaultState';
import configureStore from './core/store/configureStore';
import App from './core/App';

const store = configureStore(defaultState);
const history = createBrowserHistory();

const renderApp = () =>
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
renderApp();

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./core/App', () => {
    renderApp();
  });
}
