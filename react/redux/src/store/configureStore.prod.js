import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '../reducers';
import rootEpic from '../epics';

const epic = createEpicMiddleware();

const configureStore = preloadedState =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, epic));

export default configureStore;
