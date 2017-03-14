// Tic Tac Toe
export const tictactoe = (state = {}, action) => {
  const index = action.index;
  let newMoveRecords;

  switch (action.type) {
    case 'UPDATE_GAME_MOVE':
      let cloneSquares = state.squares.slice();
      cloneSquares[index] = state.onXPlay ? 'X' : 'O';

      newMoveRecords = [...state.moveRecords, cloneSquares];

      return {
        squares: cloneSquares,
        onXPlay: !state.onXPlay,
        moveRecords: newMoveRecords
      };

    case 'JUMP_TO_MOVE':
      const newSquares = state.moveRecords[index];
      newMoveRecords = state.moveRecords.slice(0, index + 1);

      return {
        squares: newSquares,
        onXPlay: !(index % 2),
        moveRecords: newMoveRecords
      };

    default:
      return state;
  }
}
