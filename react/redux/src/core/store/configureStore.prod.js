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
const middlewares = [epics];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const configureStore = preloadedState => {
  const store = createStore(rootReducer, preloadedState, enhancer);
  epics.run(rootEpic);

  return store;
};

export default configureStore;
