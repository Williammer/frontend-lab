export const dataFetchListReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_REPOS':
      return Object.assign({}, state, {
        repos: action.repos
      });

    case 'UPDATE_USERNAME':
      return Object.assign({}, state, {
        username: action.username
      });

    case 'UPDATE_SEARCH_KEYWORD':
      return Object.assign({}, state, {
        searchKeyword: action.searchKeyword
      });

    case 'USER_REPOS_REQUEST':
      return {
        ...state,
        isFetching: true
      };

    case 'USER_REPOS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        repos: action.response.result
      };

    case 'USER_REPOS_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.error,
        repos: []
      };

    default:
      return state;
  }
};
