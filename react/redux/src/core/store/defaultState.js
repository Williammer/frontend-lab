export const defaultState = {
  ticTacToeReducer: {
    onXPlay: true,
    squares: Array(9).fill(null),
    moveRecords: [Array(9).fill(null)],
  },
  stopWatchReducer: {
    timing: 0,
    resetCountedDown: 0,
    isRunning: false,
  },
  githubUserListReducer: {
    repos: [],
    error: '',
    searchKeyword: '',
    username: '',
    fetching: false,
  },
};
