export const githubUserListReducer = (state = {}, action) => {
  const { type, repos, username, searchKeyword, error } = action;

  switch (type) {
    case 'UPDATE_USERNAME':
      return {
        ...state,
        username,
      };

    case 'UPDATE_SEARCH_KEYWORD':
      return {
        ...state,
        searchKeyword,
      };

    case 'FETCH_REPOS':
      return {
        ...state,
        fetching: true,
      };

    case 'UPDATE_REPOS':
      return {
        ...state,
        fetching: false,
        repos,
      };

    case 'FETCH_REPOS_FAILURE':
      return {
        ...state,
        fetching: false,
        repos: [],
        error,
      };

    default:
      return state;
  }
};
