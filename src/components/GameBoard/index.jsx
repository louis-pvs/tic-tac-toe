import React from "react";
import "./GameBoard.scss";

const GameBoard = () => {
  return (
    <div className="gameboard">
      {[
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ].map((row, i) => {
        return (
          <div key={i} className="gameboard__row">
            {row.map((box, i) => {
              return (
                <div key={i} className="gameboard__col">
                  <div className="gameboard__tile">
                    <label className="gameboard__label">box {i + 1}</label>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
