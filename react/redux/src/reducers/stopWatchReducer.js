export const stopWatchReducer = (state = {}, action) => {
  const time = action.time;

  switch (action.type) {
    case 'UPDATE_TIMING':
      return Object.assign({}, state, {
        timing: time
      });

    case 'UPDATE_RESET_COUNTDOWN':
      return Object.assign({}, state, {
        resetCountedDown: time
      });

    case 'SET_IS_RUNNING':
      return Object.assign({}, state, {
        isRunning: action.isRunning
      });

    default:
      return state;
  }
}
