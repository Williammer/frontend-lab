import { combineReducers } from 'redux';
import { ticReducer } from './ticReducer';
import { stopWatchReducer } from './stopWatchReducer';
import { dataFetchListReducer } from './dataFetchListReducer';

// Updates an entity cache in response to any action with response.entities.
const githubEntity = (state = { users: {}, repos: {} }, action) => {
  if (action.response && action.response.entities) {
    return Object.assign({}, state, action.response.entities);
  }

  return state;
};

const Reducers = combineReducers({
  ticReducer,
  githubEntity,
  stopWatchReducer,
  dataFetchListReducer
});

export default Reducers;
