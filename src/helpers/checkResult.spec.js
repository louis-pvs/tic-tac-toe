const {
  rowStrike,
  columnStrike,
  diagonalStrike,
  getStrike,
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
  ["x", "o", "o"],
  ["o", "x", "x"],
  ["x", "o", "o"],
];

describe("`rowStrike()`", () => {
  it("should detect strike when it is row strike", () => {
    expect(rowStrike(boardWithRowStrike, "o").length).toBe(3);
    expect(rowStrike(boardWithRowStrike, "o")).toStrictEqual([
      "00",
      "01",
      "02",
    ]);
  });
  it("shouldn't detect strike when it is column strike", () => {
    expect(rowStrike(boardWithColumnStrike, "o").length).toBe(0);
    expect(rowStrike(boardWithColumnStrike, "o")).not.toStrictEqual([
      "00",
      "10",
      "20",
    ]);
  });
  it("shouldn't detech strike when it is diagonal strike", () => {
    expect(rowStrike(boardWithDiagonalStrike, "x").length).toBe(0);
    expect(rowStrike(boardWithDiagonalStrike, "x")).not.toStrictEqual([
      "02",
      "11",
      "20",
    ]);
  });
  it("shouldn't detech strike when it without any strike", () => {
    expect(rowStrike(boardWithoutStrike, "o").length).toBe(0);
    expect(rowStrike(boardWithoutStrike, "x")).toStrictEqual([]);
  });
  it("shouldn't detech strike with a wrong marking", () => {
    expect(rowStrike(boardWithRowStrike, "x").length).toBe(0);
    expect(rowStrike(boardWithRowStrike, "x")).not.toStrictEqual(
      "00",
      "01",
      "02"
    );
  });
});

describe("`columnStrike()`", () => {
  it("should detect strike when it is column strike", () => {
    expect(columnStrike(boardWithColumnStrike, "o").length).toBe(3);
    expect(columnStrike(boardWithColumnStrike, "o")).toStrictEqual([
      "00",
      "10",
      "20",
    ]);
  });
  it("shouldn't detect strike when it is row strike", () => {
    expect(columnStrike(boardWithRowStrike, "o").length).toBe(0);
    expect(columnStrike(boardWithRowStrike, "o")).not.toStrictEqual([
      "00",
      "01",
      "02",
    ]);
  });
  it("shouldn't detech strike when it is diagonal strike", () => {
    expect(columnStrike(boardWithDiagonalStrike, "x").length).toBe(0);
    expect(columnStrike(boardWithDiagonalStrike, "x")).not.toStrictEqual([
      "02",
      "11",
      "20",
    ]);
  });
  it("shouldn't detech strike when it without any strike", () => {
    expect(columnStrike(boardWithoutStrike, "o").length).toBe(0);
    expect(columnStrike(boardWithoutStrike, "x").length).toBe(0);
  });
  it("shouldn't detech strike with a wrong marking", () => {
    expect(columnStrike(boardWithColumnStrike, "x").length).toBe(0);
    expect(columnStrike(boardWithColumnStrike, "x")).not.toStrictEqual([
      "00",
      "10",
      "20",
    ]);
  });
});

describe("`diagonalStrike()`", () => {
  it("should detect strike when it is column strike", () => {
    expect(diagonalStrike(boardWithDiagonalStrike, "x").length).toBe(3);
    expect(diagonalStrike(boardWithDiagonalStrike, "x")).toStrictEqual([
      "02",
      "11",
      "20",
    ]);
  });
  it("shouldn't detect strike when it is row strike", () => {
    expect(diagonalStrike(boardWithRowStrike, "o").length).toBe(0);
    expect(diagonalStrike(boardWithRowStrike, "o").length).not.toStrictEqual([
      "00",
      "01",
      "02",
    ]);
  });
  it("shouldn't detech strike when it is column strike", () => {
    expect(diagonalStrike(boardWithColumnStrike, "o").length).toBe(0);
    expect(diagonalStrike(boardWithColumnStrike, "o")).not.toStrictEqual([
      "00",
      "10",
      "20",
    ]);
  });
  it("shouldn't detech strike when it without any strike", () => {
    expect(diagonalStrike(boardWithoutStrike, "o").length).toBe(0);
    expect(diagonalStrike(boardWithoutStrike, "x").length).toBe(0);
  });
  it("shouldn't detech strike with a wrong marking", () => {
    expect(diagonalStrike(boardWithDiagonalStrike, "o").length).toBe(0);
    expect(diagonalStrike(boardWithDiagonalStrike, "o")).not.toStrictEqual([
      "02",
      "11",
      "20",
    ]);
  });
});

describe("`getStrike()`", () => {
  it("should detech strike when it is strike in any direction", () => {
    expect(getStrike(boardWithRowStrike, "o")).toStrictEqual(["00", "01", "02"]);
    expect(getStrike(boardWithColumnStrike, "o")).toStrictEqual([
      "00",
      "10",
      "20",
    ]);
    expect(getStrike(boardWithDiagonalStrike, "x")).toStrictEqual([
      "02",
      "11",
      "20",
    ]);
  });
  it("shouldn't detech strike when it without any strike", () => {
    expect(getStrike(boardWithoutStrike, "o")).toStrictEqual([]);
    expect(getStrike(boardWithoutStrike, "x")).toStrictEqual([]);
  });
  it("shouldn't detech strike with a wrong marking", () => {
    expect(getStrike(boardWithRowStrike, "x")).toStrictEqual([]);
    expect(getStrike(boardWithColumnStrike, "x")).toStrictEqual([]);
    expect(getStrike(boardWithDiagonalStrike, "o")).toStrictEqual([]);
  });
});
