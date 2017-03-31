export const stopWatchReducer = (state = {}, action) => {
  const time = action.time;

  switch (action.type) {
    case 'UPDATE_TIMING':
      return {
        timing: time
      };

    case 'UPDATE_RESET_COUNTDOWN':
      return {
        resetCountedDown: time
      };

    default:
      return state;
  }
}
