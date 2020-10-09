import React from "react";
import "./App.scss";

import GameBoard from "./GameBoard";

const App = () => {
  return (
    <div className="app">
      <h1 className="app__title">Tic Tac Toe</h1>
      <div className="app__game-board">
        <GameBoard />
      </div>
    </div>
  );
};

export default App;
