import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { ticReducer } from './ticReducer';

const Reducers = combineReducers({
  routing,
  ticReducer,
});

export default Reducers;
