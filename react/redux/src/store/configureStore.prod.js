import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { get } from 'axios';
import rootReducer from '../reducers';
import rootEpic from '../epics';

const epic = createEpicMiddleware({
  dependencies: {
    fetch: get,
  },
});

const configureStore = preloadedState =>
  createStore(rootReducer, preloadedState, applyMiddleware(epic));

export default configureStore;
