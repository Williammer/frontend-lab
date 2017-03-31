// Tic Tac Toe
export const updateGameMove = (index) => {
  return {
    type: 'UPDATE_GAME_MOVE',
    index
  };
}

export const jumpToMove = (index) => {
  return {
    type: 'JUMP_TO_MOVE',
    index
  };
}

// Stop Watch
export const updateTiming = (time) => {
  return {
    type: 'UPDATE_TIMING',
    time
  };
}
export const updateResetCountDown = (time) => {
  return {
    type: 'UPDATE_RESET_COUNTDOWN',
    time
  };
}