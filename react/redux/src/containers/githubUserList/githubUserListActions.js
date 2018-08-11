import {
  FETCH_REPOS,
  FETCH_REPOS_FAILURE,
  UPDATE_USERNAME,
  UPDATE_SEARCH_KEYWORD,
  UPDATE_REPOS,
} from './githubUserListConstants';

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

export const updateRepos = repos => {
  return {
    type: UPDATE_REPOS,
    repos,
  };
};

export const fetchUserRepos = username => {
  return {
    type: FETCH_REPOS,
    username,
  };
};

export const fetchReposFailure = error => {
  return {
    type: FETCH_REPOS_FAILURE,
    error,
  };
};
