export const defaultState = {
  ticReducer: {
    onXPlay: true,
    squares: Array(9).fill(null),
    moveRecords: [
      Array(9).fill(null),
    ]
  },
  stopWatchReducer: {
    timing: 0,
    resetCountedDown: 0,
    isRunning: false,
  },
  dataFetchListReducer: {
    repos: [],
    searchKeyword: '',
    username: 'williammer',
    isFetching: false,
  },
};
