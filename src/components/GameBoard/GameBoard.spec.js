import React from "react";
import { render } from "@testing-library/react";
import GameBoard from "./index";

const CLASSNAME = {
  tile: "gameboard__tile",
};

describe("<GameBoard />", () => {
  const { container } = render(<GameBoard />);
  it("Should render 9 boxes on the board", () => {
    const tiles = container.querySelectorAll(`.${CLASSNAME.tile}`);
    expect(tiles.length).toBe(9);
  });
});
