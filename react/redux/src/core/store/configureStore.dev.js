import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import { get } from 'axios';
import rootReducer from '../rootReducer';
import rootEpic from '../rootEpic';

const epics = createEpicMiddleware({
  dependencies: {
    fetch: get,
  },
});
const middlewares = [thunk, epics];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const configureStore = preloadedState => {
  const store = createStore(rootReducer, preloadedState, enhancer);
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
