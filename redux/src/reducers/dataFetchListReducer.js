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

    case 'SET_IS_FETCHING':
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    default:
      return state;
  }
}
