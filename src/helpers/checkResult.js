/**
 * function to check if any row striked
 * @param {[[""|null|undefined]]} board
 * @param {""} markToBeCheck
 * @returns If any row from the `board` has strike base on the `markingToBeCheck`
 */
function rowStrike(board, markToBeCheck) {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === markToBeCheck &&
      board[i][1] === markToBeCheck &&
      board[i][2] === markToBeCheck
    ) {
      return true;
    }
  }
  return false;
}

/**
 * function to check if any column striked
 * @param {[[""|null|undefined]]} board
 * @param {""} markToBeCheck
 * @returns If any column from the `board` has strike base on the `markingToBeCheck`
 */
function columnStrike(board, markToBeCheck) {
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === markToBeCheck &&
      board[1][i] === markToBeCheck &&
      board[2][i] === markToBeCheck
    ) {
      return true;
    }
  }
  return false;
}

/**
 * function to check if any diagonal striked
 * @param {[[""|null|undefined]]} board
 * @param {""} markToBeCheck
 * @returns If any diagonal direction from the `board` has strike base on the `markingToBeCheck`
 */
function diagonalStrike(board, markToBeCheck) {
  if (
    board[0][0] === markToBeCheck &&
    board[1][1] === markToBeCheck &&
    board[2][2] === markToBeCheck
  ) {
    return true;
  } else if (
    board[0][2] === markToBeCheck &&
    board[1][1] === markToBeCheck &&
    board[2][0] === markToBeCheck
  ) {
    return true;
  } else return false;
}

/**
 * function to check if one of the mark has strike on board
 * @param {[[""|null|undefined]]} board
 * @param {""} markToBeCheck
 * @returns If any mark has strike in any direction from the board
 */
function gameOver(board, markingToBeCheck) {
  return (
    rowStrike(board, markingToBeCheck) ||
    columnStrike(board, markingToBeCheck) ||
    diagonalStrike(board, markingToBeCheck)
  );
}

module.exports = {
  rowStrike,
  columnStrike,
  diagonalStrike,
  gameOver,
};
