import React, { useState, useEffect } from "react";
import { curry } from "lodash";
import "./GameBoard.scss";
import cx from "classnames";
import Tile from "../Tile";
import Toggle from "../Toggle";
import StrikeLine from "../StrikeLine";
import renderConfetti from "../../helpers/renderConfetti";
import { getStrike } from "../../helpers/checkResult";

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
  const [strikeIndex, setStrikeIndex] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!stepCount) setCurrentMark(firstPlayer);
  }, [stepCount, firstPlayer]);

  useEffect(() => {
    if (strikeIndex.length) {
      setWinner(currentMark);
      renderConfetti();
    }
  }, [strikeIndex, currentMark]);

  useEffect(() => {
    if (stepCount && !strikeIndex.length) flipCurrentMark();
  }, [stepCount, result, strikeIndex]);

  const isTie = stepCount >= 9 && !winner;
  const flipCurrentMark = () => setCurrentMark(currentMark === "x" ? "o" : "x");

  const handleResetClick = () => {
    setStepCount(0);
    setResult([...INITIAL_STATE]);
    setWinner(null);
    setStrikeIndex([]);
  };
  const handleTileCheckInRow = curry((rowIndex, colIndex, value) => {
    let newResult = [...result];
    newResult[rowIndex] = [...result[rowIndex]];
    newResult[rowIndex][colIndex] = value;
    setResult(newResult);
    setStrikeIndex(getStrike(newResult, currentMark));
    setStepCount(stepCount + 1);
  });

  function renderMessage() {
    const winnerIconClassnames = cx({
      icon: true,
      "gameboard__message-icon": true,
      "icon--circle": winner === "o",
      "icon--cross": winner === "x",
      [`gameboard__message-icon--${winner}`]: !!winner,
    });
    if (isTie)
      return (
        <p className="gameboard__message">
          <i className="icon icon--circle gameboard__message-icon gameboard__message-icon--o"></i>
          <span className="gameboard__message-span">
            Game Over, and it is a tie
          </span>
          <i className="icon icon--cross gameboard__message-icon gameboard__message-icon--x"></i>
        </p>
      );
    else if (winner)
      return (
        <p className="gameboard__message">
          <span className="gameboard__message-span">Game Over, Winner is</span>
          <i className={winnerIconClassnames} />
        </p>
      );
    return null;
  }

  return (
    <>
      {renderMessage()}
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
          const handleTileCheckInCol = handleTileCheckInRow(rowIndex);
          return (
            <div key={rowIndex} className="gameboard__row">
              {row.map((mark, colIndex) => {
                const handleTileChecked = handleTileCheckInCol(colIndex);
                const id = `${rowIndex}${colIndex}`;
                const highlight = strikeIndex.indexOf(id) > -1;
                return (
                  <div key={id} className="gameboard__col">
                    <div className="gameboard__tile">
                      <fieldset className="gameboard__fieldset">
                        <Tile
                          id={id}
                          selectedValue={mark}
                          disabled={!!winner}
                          target={currentMark}
                          highlight={highlight}
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
        {winner && <StrikeLine strikeIndex={strikeIndex} mark={winner} />}
      </div>
    </>
  );
};

export default GameBoard;
