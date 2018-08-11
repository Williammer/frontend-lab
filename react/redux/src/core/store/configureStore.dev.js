import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { get } from 'axios';
import rootReducer from '../rootReducer';
import rootEpic from '../rootEpic';

const history = createBrowserHistory();
const epics = createEpicMiddleware({
  dependencies: {
    fetch: get,
  },
});
const middlewares = [epics, routerMiddleware(history)];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const configureStore = preloadedState => {
  const store = createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    enhancer,
  );
  epics.run(rootEpic);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer', () => {
      const nextRootReducer = require('../rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};

export default configureStore;
