import React, { useState } from "react";
import "./GameBoard.scss";
import Tile from "../Tile";

const INITIAL_STATE = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = () => {
  const [result, setResult] = useState(INITIAL_STATE);
  const [currentMark, setCurrentMark] = useState("o");
  const handleTileChecked = (tileValue) => {
    console.log(tileValue);
  };
  return (
    <div className="gameboard">
      {result.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="gameboard__row">
            {row.map((mark, colIndex) => {
              return (
                <div key={colIndex} className="gameboard__col">
                  <div className="gameboard__tile">
                    <fieldset className="gameboard__fieldset">
                      <Tile
                        id={`${rowIndex}${colIndex}`}
                        selectedValue={mark}
                        target={currentMark}
                        onTileChecked={handleTileChecked}
                      />
                    </fieldset>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="gameboard__horizontal-lines"></div>
      <div className="gameboard__vertical-lines"></div>
    </div>
  );
};

export default GameBoard;
