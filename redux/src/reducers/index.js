import { combineReducers } from 'redux'
import { ticReducer } from './ticReducer'
import { stopWatchReducer } from './stopWatchReducer'
import { dataFetchListReducer } from './dataFetchListReducer'

const Reducers = combineReducers({
  ticReducer,
  stopWatchReducer,
  dataFetchListReducer,
})

export default Reducers
