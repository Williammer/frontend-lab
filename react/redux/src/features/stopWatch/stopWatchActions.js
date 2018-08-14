export const updateTiming = time => {
  return {
    type: 'UPDATE_TIMING',
    time,
  };
};

export const setIsRunning = isRunning => {
  return {
    type: 'SET_IS_RUNNING',
    isRunning,
  };
};
