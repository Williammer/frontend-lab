export const stopWatchReducer = (state = {}, action) => {
  const { time, type, isRunning } = action;

  switch (type) {
    case 'UPDATE_TIMING':
      return {
        ...state,
        timing: time,
      };

    case 'UPDATE_RESET_COUNTDOWN':
      return {
        ...state,
        resetCountedDown: time,
      };

    case 'SET_IS_RUNNING':
      return {
        ...state,
        isRunning: isRunning,
      };

    default:
      return state;
  }
};
