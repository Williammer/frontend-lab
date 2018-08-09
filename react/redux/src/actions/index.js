import { CALL_API, Schemas } from '../middleware/api';
import {
  FETCH_REPOS,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILURE,
  UPDATE_USERNAME,
  UPDATE_SEARCH_KEYWORD,
  SET_IS_FETCHING,
  UPDATE_REPOS,
} from '../constants';
/**
 * Tic Tac Toe
 */
export const updateGameMove = index => {
  return {
    type: 'UPDATE_GAME_MOVE',
    index,
  };
};

export const jumpToMove = index => {
  return {
    type: 'JUMP_TO_MOVE',
    index,
  };
};

/**
 * Stop Watch
 */
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

/**
 * Data Fetch List
 */
export const updateUsername = username => {
  return {
    type: UPDATE_USERNAME,
    username,
  };
};

export const updateSearchKeyword = searchKeyword => {
  return {
    type: UPDATE_SEARCH_KEYWORD,
    searchKeyword,
  };
};

export const setIsFetching = isFetching => {
  return {
    type: SET_IS_FETCHING,
    isFetching,
  };
};

export const updateRepos = repos => {
  return {
    type: UPDATE_REPOS,
    repos,
  };
};

// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchUserRepos = username => ({
  [CALL_API]: {
    types: [FETCH_REPOS, FETCH_REPOS_SUCCESS, FETCH_REPOS_FAILURE],
    endpoint: `https://api.github.com/users/${username}/repos`,
    schema: Schemas.REPO_ARRAY,
  },
});

// Relies on Redux Thunk middleware.
export const loadUserRepos = (username, requiredFields = []) => (
  dispatch,
  getState,
) => {
  // get cached user info
  const user = getState().githubEntity.users[username];
  if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    return null;
  }

  return dispatch(fetchUserRepos(username));
};
