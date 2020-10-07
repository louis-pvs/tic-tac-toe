const {
  rowStrike,
  columnStrike,
  diagonalStrike,
  gameOver,
} = require("./checkResult");

const boardWithRowStrike = [
  ["o", "o", "o"],
  [null, null, null],
  [null, null, null],
];
const boardWithColumnStrike = [
  ["o", "x", "x"],
  ["o", null, null],
  ["o", null, null],
];
const boardWithDiagonalStrike = [
  ["o", "x", "x"],
  ["o", "x", null],
  ["x", "o", null],
];
const boardWithoutStrike = [
  ['x', 'o', 'o'],
  ['o', 'x', 'x'],
  ['x', 'o', 'o']
];

describe("`rowStrike()`", () => {
  it("should detect strike when it is row strike", () => {
    expect(rowStrike(boardWithRowStrike, "o")).toBeTruthy();
  });
  it("shouldn't detect strike when it is column strike", () => {
    expect(rowStrike(boardWithColumnStrike, "o")).toBeFalsy();
  });
  it("shouldn't detech strike when it is diagonal strike", () => {
    expect(rowStrike(boardWithDiagonalStrike, "x")).toBeFalsy();
  });
  it("shouldn't detech strike when it without any strike", () => {
    expect(rowStrike(boardWithoutStrike, "o")).toBeFalsy();
    expect(rowStrike(boardWithoutStrike, "x")).toBeFalsy();
  });
  it("shouldn't detech strike with a wrong marking", () => {
    expect(rowStrike(boardWithRowStrike, "x")).toBeFalsy();
  });
});

describe("`columnStrike()`", () => {
  it("should detect strike when it is column strike", () => {
    expect(columnStrike(boardWithColumnStrike, "o")).toBeTruthy();
  });
  it("shouldn't detect strike when it is row strike", () => {
    expect(columnStrike(boardWithRowStrike, "o")).toBeFalsy();
  });
  it("shouldn't detech strike when it is diagonal strike", () => {
    expect(columnStrike(boardWithDiagonalStrike, "x")).toBeFalsy();
  });
  it("shouldn't detech strike when it without any strike", () => {
    expect(columnStrike(boardWithoutStrike, "o")).toBeFalsy();
    expect(columnStrike(boardWithoutStrike, "x")).toBeFalsy();
  });
  it("shouldn't detech strike with a wrong marking", () => {
    expect(columnStrike(boardWithColumnStrike, "x")).toBeFalsy();
  });
});


describe("`diagonalStrike()`", () => {
  it("should detect strike when it is column strike", () => {
    expect(diagonalStrike(boardWithDiagonalStrike, "x")).toBeTruthy();
  });
  it("shouldn't detect strike when it is row strike", () => {
    expect(diagonalStrike(boardWithRowStrike, "o")).toBeFalsy();
  });
  it("shouldn't detech strike when it is column strike", () => {
    expect(diagonalStrike(boardWithColumnStrike, "o")).toBeFalsy();
  });
  it("shouldn't detech strike when it without any strike", () => {
    expect(diagonalStrike(boardWithoutStrike, "o")).toBeFalsy();
    expect(diagonalStrike(boardWithoutStrike, "x")).toBeFalsy();
  });
  it("shouldn't detech strike with a wrong marking", () => {
    expect(diagonalStrike(boardWithDiagonalStrike, "o")).toBeFalsy();
  });
});

describe("`gameOver()`", () => {
  it("should detech strike when it is strike in any direction", () => {
    expect(gameOver(boardWithRowStrike, "o")).toBeTruthy();
    expect(gameOver(boardWithColumnStrike, "o")).toBeTruthy();
    expect(gameOver(boardWithDiagonalStrike, "x")).toBeTruthy();
  })
  it("shouldn't detech strike when it without any strike", () => {
    expect(gameOver(boardWithoutStrike, "o")).toBeFalsy();
    expect(gameOver(boardWithoutStrike, "x")).toBeFalsy();
  })
  it("shouldn't detech strike with a wrong marking", () => {
    expect(gameOver(boardWithRowStrike, "x")).toBeFalsy();
    expect(gameOver(boardWithColumnStrike, "x")).toBeFalsy();
    expect(gameOver(boardWithDiagonalStrike, "o")).toBeFalsy();
  })
})