import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { defaultState } from './core/store/defaultState';
import configureStore from './core/store/configureStore';
import App from './core/App';

const store = configureStore(defaultState);

const renderApp = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
renderApp();

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./core/App', () => {
    renderApp();
  });
}
