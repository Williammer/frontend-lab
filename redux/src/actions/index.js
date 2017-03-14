// Tic Tac Toe
export const updateGameMove = (newSquare) => {
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
