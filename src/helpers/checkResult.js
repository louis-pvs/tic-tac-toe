/**
 * function to check if any row striked
 * @param {[[""|null|undefined]]} board
 * @param {""} markToBeCheck
 * @returns If any row from the `board` has strike base on the `markingToBeCheck`
 */
export function rowStrike(board, markToBeCheck) {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === markToBeCheck &&
      board[i][1] === markToBeCheck &&
      board[i][2] === markToBeCheck
    ) {
      return [`${i}0`, `${i}1`, `${i}2`];
    }
  }
  return [];
}

/**
 * function to check if any column striked
 * @param {[[""|null|undefined]]} board
 * @param {""} markToBeCheck
 * @returns If any column from the `board` has strike base on the `markingToBeCheck`
 */
export function columnStrike(board, markToBeCheck) {
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === markToBeCheck &&
      board[1][i] === markToBeCheck &&
      board[2][i] === markToBeCheck
    ) {
      return [`0${i}`, `1${i}`, `2${i}`];
    }
  }
  return [];
}

/**
 * function to check if any diagonal striked
 * @param {[[""|null|undefined]]} board
 * @param {""} markToBeCheck
 * @returns If any diagonal direction from the `board` has strike base on the `markingToBeCheck`
 */
export function diagonalStrike(board, markToBeCheck) {
  if (
    board[0][0] === markToBeCheck &&
    board[1][1] === markToBeCheck &&
    board[2][2] === markToBeCheck
  ) {
    return ["00", "11", "22"];
  } else if (
    board[0][2] === markToBeCheck &&
    board[1][1] === markToBeCheck &&
    board[2][0] === markToBeCheck
  ) {
    return ["02", "11", "20"];
  } else return [];
}

/**
 * function to check if one of the mark has strike on board
 * @param {[[""|null|undefined]]} board
 * @param {""} markToBeCheck
 * @returns If any mark has strike in any direction from the board
 */
export function getStrike(board, markingToBeCheck) {
  let rowWinner = rowStrike(board, markingToBeCheck);
  let columnWinner = columnStrike(board, markingToBeCheck);
  let diagonalWinner = diagonalStrike(board, markingToBeCheck);
  if (rowWinner.length) return rowWinner;
  else if (columnWinner.length) return columnWinner;
  else if (diagonalWinner.length) return diagonalWinner;
  else return [];
}
