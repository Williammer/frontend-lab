/**
 * Tic Tac Toe
 */
export const updateGameMove = index => {
  return {
    type: 'UPDATE_GAME_MOVE',
    index
  };
};

export const jumpToMove = index => {
  return {
    type: 'JUMP_TO_MOVE',
    index
  };
};

/**
 * Stop Watch
 */
export const updateTiming = time => {
  return {
    type: 'UPDATE_TIMING',
    time
  };
};

export const updateResetCountDown = time => {
  return {
    type: 'UPDATE_RESET_COUNTDOWN',
    time
  };
};

export const setIsRunning = isRunning => {
  return {
    type: 'SET_IS_RUNNING',
    isRunning
  };
};

/**
 * Data Fetch List
 */
export const updateUsername = username => {
  return {
    type: 'UPDATE_USERNAME',
    username
  };
};

export const updateSearchKeyword = searchKeyword => {
  return {
    type: 'UPDATE_SEARCH_KEYWORD',
    searchKeyword
  };
};

export const setIsFetching = isFetching => {
  return {
    type: 'SET_IS_FETCHING',
    isFetching
  };
};

export const updateRepos = repos => {
  return {
    type: 'UPDATE_REPOS',
    repos
  };
};
