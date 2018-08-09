export const dataFetchListReducer = (state = {}, action) => {
  const { type, repos, username, searchKeyword, response, error } = action;

  switch (type) {
    case 'UPDATE_REPOS':
      return {
        ...state,
        repos,
      };

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
        isFetching: true,
      };

    case 'FETCH_REPOS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        repos: response.result,
      };

    case 'FETCH_REPOS_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: error,
        repos: [],
      };

    default:
      return state;
  }
};
