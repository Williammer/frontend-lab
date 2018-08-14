export const stopWatchReducer = (state = {}, action) => {
  const { time, type, isRunning } = action;

  switch (type) {
    case 'UPDATE_TIMING':
      return {
        ...state,
        timing: time,
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
