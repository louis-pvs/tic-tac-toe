import React, { useState, useEffect } from "react";
import "./GameBoard.scss";
import Tile from "../Tile";
import Toggle from "../Toggle";

const INITIAL_STATE = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = () => {
  const [result, setResult] = useState(INITIAL_STATE);
  const [firstPlayer, setFirstPlayer] = useState("o");
  const [stepCount, setStepCount] = useState(0);
  const [currentMark, setCurrentMark] = useState(firstPlayer);
  const flipCurrentMark = () => {
    setCurrentMark(currentMark === "x" ? "o" : "x");
  };
  const handleResetClick = () => {
    setStepCount(0);
    setResult([...INITIAL_STATE]);
  };
  useEffect(() => {
    if (!stepCount) setCurrentMark(firstPlayer);
  }, [stepCount, firstPlayer]);
  useEffect(() => {
    if (stepCount) flipCurrentMark();
  }, [stepCount, result]);
  return (
    <>
      <div className="gameboard__controller">
        <div className="gameboard__controller-col gameboard__controller-col--left">
          <Toggle
            onToggleChanged={setFirstPlayer}
            checked={firstPlayer === "x"}
            disabled={stepCount > 0}
          />
        </div>
        <div className="gameboard__controller-col gameboard__controller-col--right">
          <button
            className="gameboard__btn"
            onClick={handleResetClick}
            disabled={!stepCount}
          >
            <i className="icon icon--redo gameboard__icon" />
            <span className="gameboard__btn-span">Restart</span>
          </button>
        </div>
      </div>
      <div className="gameboard">
        {result.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="gameboard__row">
              {row.map((mark, colIndex) => {
                const handleTileChecked = (value) => {
                  let newResult = [...result];
                  newResult[rowIndex] = [...result[rowIndex]];
                  newResult[rowIndex][colIndex] = value;
                  setResult(newResult);
                  setStepCount(stepCount + 1);
                };
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
    </>
  );
};

export default GameBoard;
