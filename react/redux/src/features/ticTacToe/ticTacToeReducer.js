export const ticTacToeReducer = (state = {}, action) => {
  const { index, type } = action;
  let newMoveRecords;

  switch (type) {
    case 'UPDATE_GAME_MOVE':
      const newSquare = state.onXPlay ? 'X' : 'O';
      let cloneSquares = state.squares.slice();
      cloneSquares[index] = newSquare;

      newMoveRecords = [...state.moveRecords, cloneSquares];

      return {
        squares: cloneSquares,
        onXPlay: !state.onXPlay,
        moveRecords: newMoveRecords,
      };

    case 'JUMP_TO_MOVE':
      const newSquares = state.moveRecords[index];
      newMoveRecords = state.moveRecords.slice(0, index + 1);

      return {
        squares: newSquares,
        onXPlay: !(index % 2),
        moveRecords: newMoveRecords,
      };

    default:
      return state;
  }
};
