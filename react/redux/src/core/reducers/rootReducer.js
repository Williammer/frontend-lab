import { combineReducers } from 'redux';
import { ticTacToeReducer } from '../../containers/ticTacToe/ticTacToeReducer';
import { stopWatchReducer } from '../../containers/stopWatch/stopWatchReducer';
import { githubUserListReducer } from '../../containers/githubUserList/githubUserListReducer';

const Reducers = combineReducers({
  ticTacToeReducer,
  stopWatchReducer,
  githubUserListReducer,
});

export default Reducers;
