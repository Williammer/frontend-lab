import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const middleware = [thunk, api];
const enhancer = composeWithDevTools(applyMiddleware(...middleware));

const configureStore = preloadedState => {
  const store = createStore(rootReducer, preloadedState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};

export default configureStore;
