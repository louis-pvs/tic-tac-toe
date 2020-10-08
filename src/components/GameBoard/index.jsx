import React, { useState, useEffect } from "react";
import "./GameBoard.scss";
import cx from "classnames";
import Tile from "../Tile";
import Toggle from "../Toggle";
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
  const isTie = stepCount >= 9 && !winner;
  const flipCurrentMark = () => {
    setCurrentMark(currentMark === "x" ? "o" : "x");
  };
  const handleResetClick = () => {
    setStepCount(0);
    setResult([...INITIAL_STATE]);
    setWinner(null);
    setStrikeIndex([]);
  };
  const handleTileChecked = (rowIndex, colIndex, value) => {
    let newResult = [...result];
    newResult[rowIndex] = [...result[rowIndex]];
    newResult[rowIndex][colIndex] = value;
    setResult(newResult);
    setStrikeIndex(getStrike(newResult, currentMark));
    setStepCount(stepCount + 1);
  };

  function renderStrikeLine() {
    if (!winner) return null;
    let top = "50%";
    let left = "50%";
    let transform = "translate(-50%, -50%)";

    const [indexOne, indexTwo, indexThree] = strikeIndex;
    const isRow = indexOne[0] === indexTwo[0] && indexTwo[0] === indexThree[0];
    const isColumn =
      indexOne[1] === indexTwo[1] && indexTwo[1] === indexThree[1];
    const isDiagonal =
      (indexOne[0] === indexThree[1] && indexTwo === "11") ||
      (indexOne[0] === indexOne[1] &&
        indexThree[0] === indexThree[1] &&
        indexTwo === "11");

    if (isRow) {
      top = `${(100 / 3) * indexOne[0] + 100 / 6}%`;
    } else if (isColumn) {
      left = `${(100 / 3) * indexOne[1] + 100 / 6}%`;
      transform = "translate(-50%, 0) rotate(-90deg)";
    } else if (isDiagonal) {
      transform = `translate(-50%, -50%) rotate(${
        indexOne[1] === "0" ? "45" : "-45"
      }deg) scaleX(1.4)`;
    }

    const lineClassnames = cx({
      "gameboard__strike-line": true,
      [`gameboard__strike-line--${winner}`]: !!winner,
    });
    const styles = { top, left, transform };
    renderConfetti();
    return <div className={lineClassnames} style={styles}></div>;
  }

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
    return " ";
  }

  useEffect(() => {
    if (!stepCount) setCurrentMark(firstPlayer);
  }, [stepCount, firstPlayer]);

  useEffect(() => {
    if (strikeIndex.length) setWinner(currentMark);
  }, [strikeIndex, currentMark]);

  useEffect(() => {
    if (stepCount && !strikeIndex.length) flipCurrentMark();
  }, [stepCount, result, strikeIndex]);
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
          return (
            <div key={rowIndex} className="gameboard__row">
              {row.map((mark, colIndex) => {
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
                          onTileChecked={(value) =>
                            handleTileChecked(rowIndex, colIndex, value)
                          }
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
        {renderStrikeLine()}
      </div>
    </>
  );
};

export default GameBoard;
