import { combineReducers } from 'redux'
import { ticReducer } from './ticReducer'
import { stopWatchReducer } from './stopWatchReducer'

const Reducers = combineReducers({
  ticReducer,
  stopWatchReducer
})

export default Reducers
