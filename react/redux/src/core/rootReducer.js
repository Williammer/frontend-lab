import { combineReducers } from 'redux';
import { ticTacToeReducer } from '../features/ticTacToe/ticTacToeReducer';
import { stopWatchReducer } from '../features/stopWatch/stopWatchReducer';
import { githubUserListReducer } from '../features/githubUserList/githubUserListReducer';
import counterListReducer from '../features/counters/counterListReducer';

const Reducers = combineReducers({
  ticTacToeReducer,
  stopWatchReducer,
  githubUserListReducer,
  counterListReducer,
});

export default Reducers;
