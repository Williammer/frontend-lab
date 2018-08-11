import { combineReducers } from 'redux';
import { ticTacToeReducer } from '../features/ticTacToe/ticTacToeReducer';
import { stopWatchReducer } from '../features/stopWatch/stopWatchReducer';
import { githubUserListReducer } from '../features/githubUserList/githubUserListReducer';

const Reducers = combineReducers({
  ticTacToeReducer,
  stopWatchReducer,
  githubUserListReducer,
});

export default Reducers;
