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
      <footer>
        <p className="app__author">
          Created by <strong>Louis Phang</strong>
        </p>
      </footer>
    </div>
  );
};

export default App;
