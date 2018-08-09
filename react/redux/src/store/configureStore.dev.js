import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { get } from 'axios';
import rootReducer from '../reducers';
import rootEpic from '../epics';

const epics = createEpicMiddleware({
  dependencies: {
    fetch: get,
  },
});
const enhancer = composeWithDevTools(applyMiddleware(epics));

const configureStore = preloadedState => {
  const store = createStore(rootReducer, preloadedState, enhancer);
  epics.run(rootEpic);

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
