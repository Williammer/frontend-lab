export const updateTiming = time => {
  return {
    type: 'UPDATE_TIMING',
    time,
  };
};

export const updateResetCountDown = time => {
  return {
    type: 'UPDATE_RESET_COUNTDOWN',
    time,
  };
};

export const setIsRunning = isRunning => {
  return {
    type: 'SET_IS_RUNNING',
    isRunning,
  };
};
