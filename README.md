## Setup and Installation
Before starting or building the project, please make sure your machine have NodeJS installed. Run `npm install` or `yarn` to install project dependencies.

## Build
Run `npm run build` or `yarn build` to have production codes in `/dist` folder.

## Development
Run `npm start` or `yarn start` to start development environment in your browser, by default your browser should open new tab with URL: http://localhost:8080/

## Rules
1. Before game start, choose either **`O`** or **`X`** who go first
2. Each turn player takes turns place a mark(depending who go first) on one of the 3x3 boxes, untill no box is vacant.
3. The **first player who achieve a strike of 3 marks will win**, else when _all 9 boxes is occupied without strike will be a tie_.
4. You may restart the game in any point of time.

## Visualize of state
### Pristine State
Below visualize an initial state of the tic-tac-toe, each array represent a row, and each null represent a box out of 9. When the box is vacant, it will be either `null` or `undefined`.
```
[
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
```
### Dirty state
Below visualize when one of the player place a mark on one of the box.
```
[
  [null, null, 'x'],
  [null, null, null],
  [null, null, null]
]
```
### Game state
Below visualize the state when **`O`** won the game.
```
[
  [null, 'o', 'x'],
  [null, 'o', 'o'],
  ['x' , 'o', 'x']
]
```
### Tie state
Below visualize the sate when the game is tie.
```
[
  ['x', 'o', 'o'],
  ['o', 'x', 'x'],
  ['x', 'o', 'o']
]
```
