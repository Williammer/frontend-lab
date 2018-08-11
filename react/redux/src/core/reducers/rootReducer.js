import { combineReducers } from 'redux';
import { ticReducer } from '../../reducers/ticReducer';
import { stopWatchReducer } from '../../reducers/stopWatchReducer';
import { dataFetchListReducer } from '../../reducers/dataFetchListReducer';

const Reducers = combineReducers({
  ticReducer,
  stopWatchReducer,
  dataFetchListReducer,
});

export default Reducers;
