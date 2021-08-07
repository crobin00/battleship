/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayGameboards": () => (/* binding */ displayGameboards),
/* harmony export */   "displayShipHorizontally": () => (/* binding */ displayShipHorizontally),
/* harmony export */   "displayShipVertically": () => (/* binding */ displayShipVertically),
/* harmony export */   "checkCorrectShip": () => (/* binding */ checkCorrectShip)
/* harmony export */ });


//Creates 10x10 div elements
function displayGameboards() {
  const playerDiv = document.querySelector('#player-board');
  const opponentDiv = document.querySelector('#opponent-board');

  for (let i = 0; i < 10; i++) {
    const rows = document.createElement('div');
    rows.classList.add('rows');
    rows.dataset.row = i;
    playerDiv.appendChild(rows);
    for (let j = 0; j < 10; j++) {
      const cols = document.createElement('div');
      cols.classList.add('cols');
      cols.dataset.col = j;
      rows.appendChild(cols);
    }
  }

  for (let i = 0; i < 10; i++) {
    const rows = document.createElement('div');
    rows.classList.add('rows');
    rows.dataset.row = i;
    opponentDiv.appendChild(rows);
    for (let j = 0; j < 10; j++) {
      const cols = document.createElement('div');
      cols.classList.add('cols');
      cols.dataset.col = j;
      rows.appendChild(cols);
    }
  }
}

function displayShipHorizontally(
  board,
  shipLength,
  yCord,
  xCord,
  selectBoardDiv
) {
  board.placeShipsHorizontally(shipLength, yCord, xCord);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board.getGameboard()[i][j] === 'ship' && selectBoardDiv == 'player') {
        const playerDiv = document.querySelector('#player-board');
        const shipRowDiv = playerDiv.querySelector(`[data-row='${i}']`);
        const shipDiv = shipRowDiv.querySelector(`[data-col='${j}']`);
        shipDiv.classList.add('ship');
        if (!shipDiv.classList.contains('vertical')) {
          shipDiv.classList.add('horizontal');
        }
      } else if (
        board.getGameboard()[i][j] === 'ship' &&
        selectBoardDiv == 'opponent'
      ) {
        const opponentDiv = document.querySelector('#opponent-board');
        const shipRowDiv = opponentDiv.querySelector(`[data-row='${i}']`);
        const shipDiv = shipRowDiv.querySelector(`[data-col='${j}']`);
        shipDiv.classList.add('ship');
        if (!shipDiv.classList.contains('vertical')) {
          shipDiv.classList.add('horizontal');
        }
      }
    }
  }
}

function displayShipVertically(
  board,
  shipLength,
  yCord,
  xCord,
  selectBoardDiv
) {
  board.placeShipsVertically(shipLength, yCord, xCord);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board.getGameboard()[i][j] === 'ship' && selectBoardDiv == 'player') {
        const playerDiv = document.querySelector('#player-board');
        const shipRowDiv = playerDiv.querySelector(`[data-row='${i}']`);
        const shipDiv = shipRowDiv.querySelector(`[data-col='${j}']`);
        shipDiv.classList.add('ship');
        if (!shipDiv.classList.contains('horizontal')) {
          shipDiv.classList.add('vertical');
        }
      } else if (
        board.getGameboard()[i][j] === 'ship' &&
        selectBoardDiv == 'opponent'
      ) {
        const opponentDiv = document.querySelector('#opponent-board');
        const shipRowDiv = opponentDiv.querySelector(`[data-row='${i}']`);
        const shipDiv = shipRowDiv.querySelector(`[data-col='${j}']`);
        shipDiv.classList.add('ship');
        if (!shipDiv.classList.contains('horizontal')) {
          shipDiv.classList.add('vertical');
        }
      }
    }
  }
}

function attackShip(board, yCord, xCord, selectBoardDiv, ship = null) {
  board.receiveAttack(ship, yCord, xCord);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board.getGameboard()[i][j] === 'hit' && selectBoardDiv == 'player') {
        const playerDiv = document.querySelector('#player-board');
        const shipRowDiv = playerDiv.querySelector(`[data-row='${i}']`);
        const shipDiv = shipRowDiv.querySelector(`[data-col='${j}']`);
        shipDiv.classList.add('hit');
        shipDiv.classList.remove('ship');
      } else if (
        board.getGameboard()[i][j] === 'hit' &&
        selectBoardDiv == 'opponent'
      ) {
        const opponentDiv = document.querySelector('#opponent-board');
        const shipRowDiv = opponentDiv.querySelector(`[data-row='${i}']`);
        const shipDiv = shipRowDiv.querySelector(`[data-col='${j}']`);
        shipDiv.classList.add('hit');
        shipDiv.classList.remove('ship');
      }
      if (board.getGameboard()[i][j] === 'miss' && selectBoardDiv == 'player') {
        const playerDiv = document.querySelector('#player-board');
        const shipRowDiv = playerDiv.querySelector(`[data-row='${i}']`);
        const shipDiv = shipRowDiv.querySelector(`[data-col='${j}']`);
        shipDiv.classList.add('miss');
      } else if (
        board.getGameboard()[i][j] === 'miss' &&
        selectBoardDiv == 'opponent'
      ) {
        const opponentDiv = document.querySelector('#opponent-board');
        const shipRowDiv = opponentDiv.querySelector(`[data-row='${i}']`);
        const shipDiv = shipRowDiv.querySelector(`[data-col='${j}']`);
        shipDiv.classList.add('miss');
      }
    }
  }
}

function checkCorrectShip(e, allShips, board, selectBoardDiv) {
  if (
    e.classList.contains('horizontal') &&
    parseInt(e.parentElement.dataset.row) === allShips.carrier.y &&
    parseInt(e.dataset.col) >= allShips.carrier.x &&
    parseInt(e.dataset.col) < allShips.carrier.x + allShips.carrier.ship.length
  ) {
    console.log('opponent carrier');
    attackShip(
      board,
      e.parentElement.dataset.row,
      e.dataset.col,
      selectBoardDiv,
      allShips.carrier.ship
    );
  } else if (
    e.classList.contains('vertical') &&
    parseInt(e.dataset.col) === allShips.carrier.x &&
    parseInt(e.parentElement.dataset.row) >= allShips.carrier.y &&
    parseInt(e.parentElement.dataset.row) <
      allShips.carrier.y + allShips.carrier.ship.length
  ) {
    console.log('opponent carrier');
    attackShip(
      board,
      e.parentElement.dataset.row,
      e.dataset.col,
      selectBoardDiv,
      allShips.carrier.ship
    );
  } else if (
    e.classList.contains('horizontal') &&
    parseInt(e.parentElement.dataset.row) === allShips.battleship.y &&
    parseInt(e.dataset.col) >= allShips.battleship.x &&
    parseInt(e.dataset.col) <
      allShips.battleship.x + allShips.battleship.ship.length
  ) {
    console.log('opponent battleship');
    attackShip(
      board,
      e.parentElement.dataset.row,
      e.dataset.col,
      selectBoardDiv,
      allShips.battleship.ship
    );
  } else if (
    e.classList.contains('vertical') &&
    parseInt(e.dataset.col) === allShips.battleship.x &&
    parseInt(e.parentElement.dataset.row) >= allShips.battleship.y &&
    parseInt(e.parentElement.dataset.row) <
      allShips.battleship.y + allShips.battleship.ship.length
  ) {
    console.log('opponent battleship');
    attackShip(
      board,
      e.parentElement.dataset.row,
      e.dataset.col,
      selectBoardDiv,
      allShips.battleship.ship
    );
  }
  if (
    e.classList.contains('horizontal') &&
    parseInt(e.parentElement.dataset.row) === allShips.cruiser.y &&
    parseInt(e.dataset.col) >= allShips.cruiser.x &&
    parseInt(e.dataset.col) < allShips.cruiser.x + allShips.cruiser.ship.length
  ) {
    console.log('opponent cruiser');
    attackShip(
      board,
      e.parentElement.dataset.row,
      e.dataset.col,
      selectBoardDiv,
      allShips.cruiser.ship
    );
  } else if (
    e.classList.contains('vertical') &&
    parseInt(e.dataset.col) === allShips.cruiser.x &&
    parseInt(e.parentElement.dataset.row) >= allShips.cruiser.y &&
    parseInt(e.parentElement.dataset.row) <
      allShips.cruiser.y + allShips.cruiser.ship.length
  ) {
    console.log('opponent cruiser');
    attackShip(
      board,
      e.parentElement.dataset.row,
      e.dataset.col,
      selectBoardDiv,
      allShips.cruiser.ship
    );
  }
  if (
    e.classList.contains('horizontal') &&
    parseInt(e.parentElement.dataset.row) === allShips.submarine.y &&
    parseInt(e.dataset.col) >= allShips.submarine.x &&
    parseInt(e.dataset.col) <
      allShips.submarine.x + allShips.submarine.ship.length
  ) {
    console.log('opponent submarine');
    attackShip(
      board,
      e.parentElement.dataset.row,
      e.dataset.col,
      selectBoardDiv,
      allShips.submarine.ship
    );
  } else if (
    e.classList.contains('vertical') &&
    parseInt(e.dataset.col) === allShips.submarine.x &&
    parseInt(e.parentElement.dataset.row) >= allShips.submarine.y &&
    parseInt(e.parentElement.dataset.row) <
      allShips.submarine.y + allShips.submarine.ship.length
  ) {
    console.log('opponent submarine');
    attackShip(
      board,
      e.parentElement.dataset.row,
      e.dataset.col,
      selectBoardDiv,
      allShips.submarine.ship
    );
  }
  if (
    e.classList.contains('horizontal') &&
    parseInt(e.parentElement.dataset.row) === allShips.destroyer.y &&
    parseInt(e.dataset.col) >= allShips.destroyer.x &&
    parseInt(e.dataset.col) <
      allShips.destroyer.x + allShips.destroyer.ship.length
  ) {
    console.log('opponent destroyer');
    attackShip(
      board,
      e.parentElement.dataset.row,
      e.dataset.col,
      selectBoardDiv,
      allShips.destroyer.ship
    );
  } else if (
    e.classList.contains('vertical') &&
    parseInt(e.dataset.col) === allShips.destroyer.x &&
    parseInt(e.parentElement.dataset.row) >= allShips.destroyer.y &&
    parseInt(e.parentElement.dataset.row) <
      allShips.destroyer.y + allShips.destroyer.ship.length
  ) {
    console.log('opponent destroyer');
    attackShip(
      board,
      e.parentElement.dataset.row,
      e.dataset.col,
      selectBoardDiv,
      allShips.destroyer.ship
    );
  } else if (
    !e.classList.contains('horizontal') &&
    !e.classList.contains('vertical')
  ) {
    console.log('miss');
    attackShip(
      board,
      e.parentElement.dataset.row,
      e.dataset.col,
      selectBoardDiv
    );
  }
}


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createGameboard": () => (/* binding */ createGameboard)
/* harmony export */ });
/* harmony import */ var _ships_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships.js */ "./src/ships.js");



const createGameboard = function () {
  const gameboard = [];

  //Initially creation of 10x10 gameboard array
  const set = () => {
    for (let i = 0; i < 10; i++) {
      gameboard.push([]);
      for (let j = 0; j < 10; j++) {
        gameboard[i].push('');
      }
    }
  };

  const placeShipsHorizontally = function (shipLength, yCord, xCord) {
    for (let i = 0; i < shipLength; i++) {
      gameboard[yCord][xCord + i] = 'ship';
    }
  };

  const placeShipsVertically = function (shipLength, yCord, xCord) {
    for (let i = 0; i < shipLength; i++) {
      gameboard[yCord + i][xCord] = 'ship';
    }
  };

  //Receives coordinates and determines whether those coords hit a ship or not
  const receiveAttack = function (ship, yCord, xCord) {
    if (gameboard[yCord][xCord] === 'ship') {
      gameboard[yCord][xCord] = 'hit';
      ship.hit();
    } else {
      gameboard[yCord][xCord] = 'miss';
    }
  };

  const getGameboard = function () {
    return gameboard;
  };
  return {
    set,
    placeShipsHorizontally,
    placeShipsVertically,
    getGameboard,
    receiveAttack,
  };
};


/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShip": () => (/* binding */ createShip)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");



const createShip = function (length) {
  const positionHit = [];
  const hit = (position = undefined) => {
    if (position > length - 1) {
      return;
    } else {
      positionHit.push('hit');
    }
  };
  const isSunk = () => {
    if (positionHit.length < length) {
      return false;
    } else if (positionHit.length == length) {
      return true;
    }
  };
  return { positionHit, hit, isSunk, length };
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
/* harmony import */ var _ships_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships.js */ "./src/ships.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");




const opponentDiv = document.querySelector('#opponent-board');
let playerTurn = false;
let opponentTurn = false;
let gameOver = false;
let randomY = 0;
let randomX = 0;

let playerShips = {
  carrier: {
    y: null,
    x: null,
    ship: null,
  },
  battleship: {
    y: null,
    x: null,
    ship: null,
  },
  cruiser: {
    y: null,
    x: null,
    ship: null,
  },
  submarine: {
    y: null,
    x: null,
    ship: null,
  },
  destroyer: {
    y: null,
    x: null,
    ship: null,
  },
};

let opponentShips = {
  carrier: {
    y: null,
    x: null,
    ship: null,
  },
  battleship: {
    y: null,
    x: null,
    ship: null,
  },
  cruiser: {
    y: null,
    x: null,
    ship: null,
  },
  submarine: {
    y: null,
    x: null,
    ship: null,
  },
  destroyer: {
    y: null,
    x: null,
    ship: null,
  },
};

const playerCarrier = (0,_ships_js__WEBPACK_IMPORTED_MODULE_1__.createShip)(5);
const playerBattleship = (0,_ships_js__WEBPACK_IMPORTED_MODULE_1__.createShip)(4);
const playerCruiser = (0,_ships_js__WEBPACK_IMPORTED_MODULE_1__.createShip)(3);
const playerSubmarine = (0,_ships_js__WEBPACK_IMPORTED_MODULE_1__.createShip)(3);
const playerDestroyer = (0,_ships_js__WEBPACK_IMPORTED_MODULE_1__.createShip)(2);

const opponentCarrier = (0,_ships_js__WEBPACK_IMPORTED_MODULE_1__.createShip)(5);
const opponentBattleship = (0,_ships_js__WEBPACK_IMPORTED_MODULE_1__.createShip)(4);
const opponentCruiser = (0,_ships_js__WEBPACK_IMPORTED_MODULE_1__.createShip)(3);
const opponentSubmarine = (0,_ships_js__WEBPACK_IMPORTED_MODULE_1__.createShip)(3);
const opponentDestroyer = (0,_ships_js__WEBPACK_IMPORTED_MODULE_1__.createShip)(2);

const playerBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.createGameboard)();
playerBoard.set();
const opponentBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.createGameboard)();
opponentBoard.set();

(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayGameboards)();

//Player Ship placement
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipHorizontally)(playerBoard, playerCarrier.length, 0, 0, 'player');
playerShips.carrier.y = 0;
playerShips.carrier.x = 0;
playerShips.carrier.ship = playerCarrier;
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipVertically)(playerBoard, playerBattleship.length, 2, 2, 'player');
playerShips.battleship.y = 2;
playerShips.battleship.x = 2;
playerShips.battleship.ship = playerBattleship;
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipHorizontally)(playerBoard, playerCruiser.length, 9, 0, 'player');
playerShips.cruiser.y = 9;
playerShips.cruiser.x = 0;
playerShips.cruiser.ship = playerCruiser;
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipHorizontally)(playerBoard, playerSubmarine.length, 5, 5, 'player');
playerShips.submarine.y = 5;
playerShips.submarine.x = 5;
playerShips.submarine.ship = playerSubmarine;
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipVertically)(playerBoard, playerDestroyer.length, 0, 9, 'player');
playerShips.destroyer.y = 0;
playerShips.destroyer.x = 9;
playerShips.destroyer.ship = playerDestroyer;

//Opponents Ship placement
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipHorizontally)(
  opponentBoard,
  opponentCarrier.length,
  0,
  0,
  'opponent'
);
opponentShips.carrier.y = 0;
opponentShips.carrier.x = 0;
opponentShips.carrier.ship = opponentCarrier;
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipVertically)(
  opponentBoard,
  opponentBattleship.length,
  2,
  2,
  'opponent'
);
opponentShips.battleship.y = 2;
opponentShips.battleship.x = 2;
opponentShips.battleship.ship = opponentBattleship;
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipHorizontally)(
  opponentBoard,
  opponentCruiser.length,
  9,
  0,
  'opponent'
);
opponentShips.cruiser.y = 9;
opponentShips.cruiser.x = 0;
opponentShips.cruiser.ship = opponentCruiser;
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipHorizontally)(
  opponentBoard,
  opponentSubmarine.length,
  5,
  5,
  'opponent'
);
opponentShips.submarine.y = 5;
opponentShips.submarine.x = 5;
opponentShips.submarine.ship = opponentSubmarine;
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipVertically)(
  opponentBoard,
  opponentDestroyer.length,
  0,
  9,
  'opponent'
);
opponentShips.destroyer.y = 0;
opponentShips.destroyer.x = 9;
opponentShips.destroyer.ship = opponentDestroyer;

playerTurn = true;

document.addEventListener('click', (e) => {
  randomY = Math.round(Math.random() * 9);
  randomX = Math.round(Math.random() * 9);
  if (e.target.parentElement.parentElement.id == 'opponent-board') {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.checkCorrectShip)(e.target, opponentShips, opponentBoard, 'opponent');
    console.log(
      e.target.parentElement.parentElement.parentElement.children[0].children[5]
        .children[5]
    );
    console.log(e);
    //console.log(e.target.parentElement);
    console.log(
      e.target.parentElement.parentElement.parentElement.children[0].children[
        randomY
      ].children[randomX]
    );
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.checkCorrectShip)(
      e.target.parentElement.parentElement.parentElement.children[0].children[
        randomY
      ].children[randomX],
      playerShips,
      playerBoard,
      'player'
    );
  }
});

console.log(playerBoard.getGameboard());
console.log(opponentBoard.getGameboard());
console.log(opponentCarrier);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUtFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsUUFBUTtBQUMxQixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EsaUVBQWlFLEVBQUU7QUFDbkUsK0RBQStELEVBQUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsRUFBRTtBQUNyRSwrREFBK0QsRUFBRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLGlFQUFpRSxFQUFFO0FBQ25FLCtEQUErRCxFQUFFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLEVBQUU7QUFDckUsK0RBQStELEVBQUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLGlFQUFpRSxFQUFFO0FBQ25FLCtEQUErRCxFQUFFO0FBQ2pFO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsRUFBRTtBQUNyRSwrREFBK0QsRUFBRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLEVBQUU7QUFDbkUsK0RBQStELEVBQUU7QUFDakU7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsRUFBRTtBQUNyRSwrREFBK0QsRUFBRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QSxnRUFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUkseURBQWdCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHlEQUFnQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7XG4gIGRpc3BsYXlHYW1lYm9hcmRzLFxuICBkaXNwbGF5U2hpcEhvcml6b250YWxseSxcbiAgZGlzcGxheVNoaXBWZXJ0aWNhbGx5LFxuICBjaGVja0NvcnJlY3RTaGlwLFxufTtcblxuLy9DcmVhdGVzIDEweDEwIGRpdiBlbGVtZW50c1xuZnVuY3Rpb24gZGlzcGxheUdhbWVib2FyZHMoKSB7XG4gIGNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKTtcbiAgY29uc3Qgb3Bwb25lbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3Bwb25lbnQtYm9hcmQnKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCByb3dzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm93cy5jbGFzc0xpc3QuYWRkKCdyb3dzJyk7XG4gICAgcm93cy5kYXRhc2V0LnJvdyA9IGk7XG4gICAgcGxheWVyRGl2LmFwcGVuZENoaWxkKHJvd3MpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3QgY29scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29scy5jbGFzc0xpc3QuYWRkKCdjb2xzJyk7XG4gICAgICBjb2xzLmRhdGFzZXQuY29sID0gajtcbiAgICAgIHJvd3MuYXBwZW5kQ2hpbGQoY29scyk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgY29uc3Qgcm93cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJvd3MuY2xhc3NMaXN0LmFkZCgncm93cycpO1xuICAgIHJvd3MuZGF0YXNldC5yb3cgPSBpO1xuICAgIG9wcG9uZW50RGl2LmFwcGVuZENoaWxkKHJvd3MpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3QgY29scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29scy5jbGFzc0xpc3QuYWRkKCdjb2xzJyk7XG4gICAgICBjb2xzLmRhdGFzZXQuY29sID0gajtcbiAgICAgIHJvd3MuYXBwZW5kQ2hpbGQoY29scyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTaGlwSG9yaXpvbnRhbGx5KFxuICBib2FyZCxcbiAgc2hpcExlbmd0aCxcbiAgeUNvcmQsXG4gIHhDb3JkLFxuICBzZWxlY3RCb2FyZERpdlxuKSB7XG4gIGJvYXJkLnBsYWNlU2hpcHNIb3Jpem9udGFsbHkoc2hpcExlbmd0aCwgeUNvcmQsIHhDb3JkKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGlmIChib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gJ3NoaXAnICYmIHNlbGVjdEJvYXJkRGl2ID09ICdwbGF5ZXInKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKTtcbiAgICAgICAgY29uc3Qgc2hpcFJvd0RpdiA9IHBsYXllckRpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgaWYgKCFzaGlwRGl2LmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSkge1xuICAgICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZCgnaG9yaXpvbnRhbCcpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gJ3NoaXAnICYmXG4gICAgICAgIHNlbGVjdEJvYXJkRGl2ID09ICdvcHBvbmVudCdcbiAgICAgICkge1xuICAgICAgICBjb25zdCBvcHBvbmVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcHBvbmVudC1ib2FyZCcpO1xuICAgICAgICBjb25zdCBzaGlwUm93RGl2ID0gb3Bwb25lbnREaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PScke2l9J11gKTtcbiAgICAgICAgY29uc3Qgc2hpcERpdiA9IHNoaXBSb3dEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtY29sPScke2p9J11gKTtcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgIGlmICghc2hpcERpdi5jbGFzc0xpc3QuY29udGFpbnMoJ3ZlcnRpY2FsJykpIHtcbiAgICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ2hvcml6b250YWwnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2hpcFZlcnRpY2FsbHkoXG4gIGJvYXJkLFxuICBzaGlwTGVuZ3RoLFxuICB5Q29yZCxcbiAgeENvcmQsXG4gIHNlbGVjdEJvYXJkRGl2XG4pIHtcbiAgYm9hcmQucGxhY2VTaGlwc1ZlcnRpY2FsbHkoc2hpcExlbmd0aCwgeUNvcmQsIHhDb3JkKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGlmIChib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gJ3NoaXAnICYmIHNlbGVjdEJvYXJkRGl2ID09ICdwbGF5ZXInKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKTtcbiAgICAgICAgY29uc3Qgc2hpcFJvd0RpdiA9IHBsYXllckRpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgaWYgKCFzaGlwRGl2LmNsYXNzTGlzdC5jb250YWlucygnaG9yaXpvbnRhbCcpKSB7XG4gICAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCd2ZXJ0aWNhbCcpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gJ3NoaXAnICYmXG4gICAgICAgIHNlbGVjdEJvYXJkRGl2ID09ICdvcHBvbmVudCdcbiAgICAgICkge1xuICAgICAgICBjb25zdCBvcHBvbmVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcHBvbmVudC1ib2FyZCcpO1xuICAgICAgICBjb25zdCBzaGlwUm93RGl2ID0gb3Bwb25lbnREaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PScke2l9J11gKTtcbiAgICAgICAgY29uc3Qgc2hpcERpdiA9IHNoaXBSb3dEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtY29sPScke2p9J11gKTtcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgIGlmICghc2hpcERpdi5jbGFzc0xpc3QuY29udGFpbnMoJ2hvcml6b250YWwnKSkge1xuICAgICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZCgndmVydGljYWwnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhdHRhY2tTaGlwKGJvYXJkLCB5Q29yZCwgeENvcmQsIHNlbGVjdEJvYXJkRGl2LCBzaGlwID0gbnVsbCkge1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKHNoaXAsIHlDb3JkLCB4Q29yZCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgaWYgKGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnaGl0JyAmJiBzZWxlY3RCb2FyZERpdiA9PSAncGxheWVyJykge1xuICAgICAgICBjb25zdCBwbGF5ZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHNoaXBSb3dEaXYgPSBwbGF5ZXJEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PScke2l9J11gKTtcbiAgICAgICAgY29uc3Qgc2hpcERpdiA9IHNoaXBSb3dEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtY29sPScke2p9J11gKTtcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gJ2hpdCcgJiZcbiAgICAgICAgc2VsZWN0Qm9hcmREaXYgPT0gJ29wcG9uZW50J1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG9wcG9uZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wcG9uZW50LWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHNoaXBSb3dEaXYgPSBvcHBvbmVudERpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcbiAgICAgIH1cbiAgICAgIGlmIChib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gJ21pc3MnICYmIHNlbGVjdEJvYXJkRGl2ID09ICdwbGF5ZXInKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKTtcbiAgICAgICAgY29uc3Qgc2hpcFJvd0RpdiA9IHBsYXllckRpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnbWlzcycgJiZcbiAgICAgICAgc2VsZWN0Qm9hcmREaXYgPT0gJ29wcG9uZW50J1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG9wcG9uZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wcG9uZW50LWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHNoaXBSb3dEaXYgPSBvcHBvbmVudERpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tDb3JyZWN0U2hpcChlLCBhbGxTaGlwcywgYm9hcmQsIHNlbGVjdEJvYXJkRGl2KSB7XG4gIGlmIChcbiAgICBlLmNsYXNzTGlzdC5jb250YWlucygnaG9yaXpvbnRhbCcpICYmXG4gICAgcGFyc2VJbnQoZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA9PT0gYWxsU2hpcHMuY2Fycmllci55ICYmXG4gICAgcGFyc2VJbnQoZS5kYXRhc2V0LmNvbCkgPj0gYWxsU2hpcHMuY2Fycmllci54ICYmXG4gICAgcGFyc2VJbnQoZS5kYXRhc2V0LmNvbCkgPCBhbGxTaGlwcy5jYXJyaWVyLnggKyBhbGxTaGlwcy5jYXJyaWVyLnNoaXAubGVuZ3RoXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdvcHBvbmVudCBjYXJyaWVyJyk7XG4gICAgYXR0YWNrU2hpcChcbiAgICAgIGJvYXJkLFxuICAgICAgZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93LFxuICAgICAgZS5kYXRhc2V0LmNvbCxcbiAgICAgIHNlbGVjdEJvYXJkRGl2LFxuICAgICAgYWxsU2hpcHMuY2Fycmllci5zaGlwXG4gICAgKTtcbiAgfSBlbHNlIGlmIChcbiAgICBlLmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSAmJlxuICAgIHBhcnNlSW50KGUuZGF0YXNldC5jb2wpID09PSBhbGxTaGlwcy5jYXJyaWVyLnggJiZcbiAgICBwYXJzZUludChlLnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3cpID49IGFsbFNoaXBzLmNhcnJpZXIueSAmJlxuICAgIHBhcnNlSW50KGUucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdykgPFxuICAgICAgYWxsU2hpcHMuY2Fycmllci55ICsgYWxsU2hpcHMuY2Fycmllci5zaGlwLmxlbmd0aFxuICApIHtcbiAgICBjb25zb2xlLmxvZygnb3Bwb25lbnQgY2FycmllcicpO1xuICAgIGF0dGFja1NoaXAoXG4gICAgICBib2FyZCxcbiAgICAgIGUucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdyxcbiAgICAgIGUuZGF0YXNldC5jb2wsXG4gICAgICBzZWxlY3RCb2FyZERpdixcbiAgICAgIGFsbFNoaXBzLmNhcnJpZXIuc2hpcFxuICAgICk7XG4gIH0gZWxzZSBpZiAoXG4gICAgZS5jbGFzc0xpc3QuY29udGFpbnMoJ2hvcml6b250YWwnKSAmJlxuICAgIHBhcnNlSW50KGUucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdykgPT09IGFsbFNoaXBzLmJhdHRsZXNoaXAueSAmJlxuICAgIHBhcnNlSW50KGUuZGF0YXNldC5jb2wpID49IGFsbFNoaXBzLmJhdHRsZXNoaXAueCAmJlxuICAgIHBhcnNlSW50KGUuZGF0YXNldC5jb2wpIDxcbiAgICAgIGFsbFNoaXBzLmJhdHRsZXNoaXAueCArIGFsbFNoaXBzLmJhdHRsZXNoaXAuc2hpcC5sZW5ndGhcbiAgKSB7XG4gICAgY29uc29sZS5sb2coJ29wcG9uZW50IGJhdHRsZXNoaXAnKTtcbiAgICBhdHRhY2tTaGlwKFxuICAgICAgYm9hcmQsXG4gICAgICBlLnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3csXG4gICAgICBlLmRhdGFzZXQuY29sLFxuICAgICAgc2VsZWN0Qm9hcmREaXYsXG4gICAgICBhbGxTaGlwcy5iYXR0bGVzaGlwLnNoaXBcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJ0aWNhbCcpICYmXG4gICAgcGFyc2VJbnQoZS5kYXRhc2V0LmNvbCkgPT09IGFsbFNoaXBzLmJhdHRsZXNoaXAueCAmJlxuICAgIHBhcnNlSW50KGUucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdykgPj0gYWxsU2hpcHMuYmF0dGxlc2hpcC55ICYmXG4gICAgcGFyc2VJbnQoZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA8XG4gICAgICBhbGxTaGlwcy5iYXR0bGVzaGlwLnkgKyBhbGxTaGlwcy5iYXR0bGVzaGlwLnNoaXAubGVuZ3RoXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdvcHBvbmVudCBiYXR0bGVzaGlwJyk7XG4gICAgYXR0YWNrU2hpcChcbiAgICAgIGJvYXJkLFxuICAgICAgZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93LFxuICAgICAgZS5kYXRhc2V0LmNvbCxcbiAgICAgIHNlbGVjdEJvYXJkRGl2LFxuICAgICAgYWxsU2hpcHMuYmF0dGxlc2hpcC5zaGlwXG4gICAgKTtcbiAgfVxuICBpZiAoXG4gICAgZS5jbGFzc0xpc3QuY29udGFpbnMoJ2hvcml6b250YWwnKSAmJlxuICAgIHBhcnNlSW50KGUucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdykgPT09IGFsbFNoaXBzLmNydWlzZXIueSAmJlxuICAgIHBhcnNlSW50KGUuZGF0YXNldC5jb2wpID49IGFsbFNoaXBzLmNydWlzZXIueCAmJlxuICAgIHBhcnNlSW50KGUuZGF0YXNldC5jb2wpIDwgYWxsU2hpcHMuY3J1aXNlci54ICsgYWxsU2hpcHMuY3J1aXNlci5zaGlwLmxlbmd0aFxuICApIHtcbiAgICBjb25zb2xlLmxvZygnb3Bwb25lbnQgY3J1aXNlcicpO1xuICAgIGF0dGFja1NoaXAoXG4gICAgICBib2FyZCxcbiAgICAgIGUucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdyxcbiAgICAgIGUuZGF0YXNldC5jb2wsXG4gICAgICBzZWxlY3RCb2FyZERpdixcbiAgICAgIGFsbFNoaXBzLmNydWlzZXIuc2hpcFxuICAgICk7XG4gIH0gZWxzZSBpZiAoXG4gICAgZS5jbGFzc0xpc3QuY29udGFpbnMoJ3ZlcnRpY2FsJykgJiZcbiAgICBwYXJzZUludChlLmRhdGFzZXQuY29sKSA9PT0gYWxsU2hpcHMuY3J1aXNlci54ICYmXG4gICAgcGFyc2VJbnQoZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA+PSBhbGxTaGlwcy5jcnVpc2VyLnkgJiZcbiAgICBwYXJzZUludChlLnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3cpIDxcbiAgICAgIGFsbFNoaXBzLmNydWlzZXIueSArIGFsbFNoaXBzLmNydWlzZXIuc2hpcC5sZW5ndGhcbiAgKSB7XG4gICAgY29uc29sZS5sb2coJ29wcG9uZW50IGNydWlzZXInKTtcbiAgICBhdHRhY2tTaGlwKFxuICAgICAgYm9hcmQsXG4gICAgICBlLnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3csXG4gICAgICBlLmRhdGFzZXQuY29sLFxuICAgICAgc2VsZWN0Qm9hcmREaXYsXG4gICAgICBhbGxTaGlwcy5jcnVpc2VyLnNoaXBcbiAgICApO1xuICB9XG4gIGlmIChcbiAgICBlLmNsYXNzTGlzdC5jb250YWlucygnaG9yaXpvbnRhbCcpICYmXG4gICAgcGFyc2VJbnQoZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA9PT0gYWxsU2hpcHMuc3VibWFyaW5lLnkgJiZcbiAgICBwYXJzZUludChlLmRhdGFzZXQuY29sKSA+PSBhbGxTaGlwcy5zdWJtYXJpbmUueCAmJlxuICAgIHBhcnNlSW50KGUuZGF0YXNldC5jb2wpIDxcbiAgICAgIGFsbFNoaXBzLnN1Ym1hcmluZS54ICsgYWxsU2hpcHMuc3VibWFyaW5lLnNoaXAubGVuZ3RoXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdvcHBvbmVudCBzdWJtYXJpbmUnKTtcbiAgICBhdHRhY2tTaGlwKFxuICAgICAgYm9hcmQsXG4gICAgICBlLnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3csXG4gICAgICBlLmRhdGFzZXQuY29sLFxuICAgICAgc2VsZWN0Qm9hcmREaXYsXG4gICAgICBhbGxTaGlwcy5zdWJtYXJpbmUuc2hpcFxuICAgICk7XG4gIH0gZWxzZSBpZiAoXG4gICAgZS5jbGFzc0xpc3QuY29udGFpbnMoJ3ZlcnRpY2FsJykgJiZcbiAgICBwYXJzZUludChlLmRhdGFzZXQuY29sKSA9PT0gYWxsU2hpcHMuc3VibWFyaW5lLnggJiZcbiAgICBwYXJzZUludChlLnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3cpID49IGFsbFNoaXBzLnN1Ym1hcmluZS55ICYmXG4gICAgcGFyc2VJbnQoZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA8XG4gICAgICBhbGxTaGlwcy5zdWJtYXJpbmUueSArIGFsbFNoaXBzLnN1Ym1hcmluZS5zaGlwLmxlbmd0aFxuICApIHtcbiAgICBjb25zb2xlLmxvZygnb3Bwb25lbnQgc3VibWFyaW5lJyk7XG4gICAgYXR0YWNrU2hpcChcbiAgICAgIGJvYXJkLFxuICAgICAgZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93LFxuICAgICAgZS5kYXRhc2V0LmNvbCxcbiAgICAgIHNlbGVjdEJvYXJkRGl2LFxuICAgICAgYWxsU2hpcHMuc3VibWFyaW5lLnNoaXBcbiAgICApO1xuICB9XG4gIGlmIChcbiAgICBlLmNsYXNzTGlzdC5jb250YWlucygnaG9yaXpvbnRhbCcpICYmXG4gICAgcGFyc2VJbnQoZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA9PT0gYWxsU2hpcHMuZGVzdHJveWVyLnkgJiZcbiAgICBwYXJzZUludChlLmRhdGFzZXQuY29sKSA+PSBhbGxTaGlwcy5kZXN0cm95ZXIueCAmJlxuICAgIHBhcnNlSW50KGUuZGF0YXNldC5jb2wpIDxcbiAgICAgIGFsbFNoaXBzLmRlc3Ryb3llci54ICsgYWxsU2hpcHMuZGVzdHJveWVyLnNoaXAubGVuZ3RoXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdvcHBvbmVudCBkZXN0cm95ZXInKTtcbiAgICBhdHRhY2tTaGlwKFxuICAgICAgYm9hcmQsXG4gICAgICBlLnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3csXG4gICAgICBlLmRhdGFzZXQuY29sLFxuICAgICAgc2VsZWN0Qm9hcmREaXYsXG4gICAgICBhbGxTaGlwcy5kZXN0cm95ZXIuc2hpcFxuICAgICk7XG4gIH0gZWxzZSBpZiAoXG4gICAgZS5jbGFzc0xpc3QuY29udGFpbnMoJ3ZlcnRpY2FsJykgJiZcbiAgICBwYXJzZUludChlLmRhdGFzZXQuY29sKSA9PT0gYWxsU2hpcHMuZGVzdHJveWVyLnggJiZcbiAgICBwYXJzZUludChlLnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3cpID49IGFsbFNoaXBzLmRlc3Ryb3llci55ICYmXG4gICAgcGFyc2VJbnQoZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA8XG4gICAgICBhbGxTaGlwcy5kZXN0cm95ZXIueSArIGFsbFNoaXBzLmRlc3Ryb3llci5zaGlwLmxlbmd0aFxuICApIHtcbiAgICBjb25zb2xlLmxvZygnb3Bwb25lbnQgZGVzdHJveWVyJyk7XG4gICAgYXR0YWNrU2hpcChcbiAgICAgIGJvYXJkLFxuICAgICAgZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93LFxuICAgICAgZS5kYXRhc2V0LmNvbCxcbiAgICAgIHNlbGVjdEJvYXJkRGl2LFxuICAgICAgYWxsU2hpcHMuZGVzdHJveWVyLnNoaXBcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgICFlLmNsYXNzTGlzdC5jb250YWlucygnaG9yaXpvbnRhbCcpICYmXG4gICAgIWUuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJ0aWNhbCcpXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdtaXNzJyk7XG4gICAgYXR0YWNrU2hpcChcbiAgICAgIGJvYXJkLFxuICAgICAgZS5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93LFxuICAgICAgZS5kYXRhc2V0LmNvbCxcbiAgICAgIHNlbGVjdEJvYXJkRGl2XG4gICAgKTtcbiAgfVxufVxuIiwiZXhwb3J0IHsgY3JlYXRlR2FtZWJvYXJkIH07XG5pbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSAnLi9zaGlwcy5qcyc7XG5cbmNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gW107XG5cbiAgLy9Jbml0aWFsbHkgY3JlYXRpb24gb2YgMTB4MTAgZ2FtZWJvYXJkIGFycmF5XG4gIGNvbnN0IHNldCA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGdhbWVib2FyZC5wdXNoKFtdKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBnYW1lYm9hcmRbaV0ucHVzaCgnJyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcHNIb3Jpem9udGFsbHkgPSBmdW5jdGlvbiAoc2hpcExlbmd0aCwgeUNvcmQsIHhDb3JkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGdhbWVib2FyZFt5Q29yZF1beENvcmQgKyBpXSA9ICdzaGlwJztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwc1ZlcnRpY2FsbHkgPSBmdW5jdGlvbiAoc2hpcExlbmd0aCwgeUNvcmQsIHhDb3JkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGdhbWVib2FyZFt5Q29yZCArIGldW3hDb3JkXSA9ICdzaGlwJztcbiAgICB9XG4gIH07XG5cbiAgLy9SZWNlaXZlcyBjb29yZGluYXRlcyBhbmQgZGV0ZXJtaW5lcyB3aGV0aGVyIHRob3NlIGNvb3JkcyBoaXQgYSBzaGlwIG9yIG5vdFxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24gKHNoaXAsIHlDb3JkLCB4Q29yZCkge1xuICAgIGlmIChnYW1lYm9hcmRbeUNvcmRdW3hDb3JkXSA9PT0gJ3NoaXAnKSB7XG4gICAgICBnYW1lYm9hcmRbeUNvcmRdW3hDb3JkXSA9ICdoaXQnO1xuICAgICAgc2hpcC5oaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FtZWJvYXJkW3lDb3JkXVt4Q29yZF0gPSAnbWlzcyc7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEdhbWVib2FyZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2FtZWJvYXJkO1xuICB9O1xuICByZXR1cm4ge1xuICAgIHNldCxcbiAgICBwbGFjZVNoaXBzSG9yaXpvbnRhbGx5LFxuICAgIHBsYWNlU2hpcHNWZXJ0aWNhbGx5LFxuICAgIGdldEdhbWVib2FyZCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICB9O1xufTtcbiIsImV4cG9ydCB7IGNyZWF0ZVNoaXAgfTtcbmltcG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkLmpzJztcblxuY29uc3QgY3JlYXRlU2hpcCA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgY29uc3QgcG9zaXRpb25IaXQgPSBbXTtcbiAgY29uc3QgaGl0ID0gKHBvc2l0aW9uID0gdW5kZWZpbmVkKSA9PiB7XG4gICAgaWYgKHBvc2l0aW9uID4gbGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3NpdGlvbkhpdC5wdXNoKCdoaXQnKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZiAocG9zaXRpb25IaXQubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbkhpdC5sZW5ndGggPT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB7IHBvc2l0aW9uSGl0LCBoaXQsIGlzU3VuaywgbGVuZ3RoIH07XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZC5qcyc7XG5pbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSAnLi9zaGlwcy5qcyc7XG5pbXBvcnQge1xuICBkaXNwbGF5R2FtZWJvYXJkcyxcbiAgZGlzcGxheVNoaXBIb3Jpem9udGFsbHksXG4gIGRpc3BsYXlTaGlwVmVydGljYWxseSxcbiAgY2hlY2tDb3JyZWN0U2hpcCxcbn0gZnJvbSAnLi9kb20uanMnO1xuXG5jb25zdCBvcHBvbmVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcHBvbmVudC1ib2FyZCcpO1xubGV0IHBsYXllclR1cm4gPSBmYWxzZTtcbmxldCBvcHBvbmVudFR1cm4gPSBmYWxzZTtcbmxldCBnYW1lT3ZlciA9IGZhbHNlO1xubGV0IHJhbmRvbVkgPSAwO1xubGV0IHJhbmRvbVggPSAwO1xuXG5sZXQgcGxheWVyU2hpcHMgPSB7XG4gIGNhcnJpZXI6IHtcbiAgICB5OiBudWxsLFxuICAgIHg6IG51bGwsXG4gICAgc2hpcDogbnVsbCxcbiAgfSxcbiAgYmF0dGxlc2hpcDoge1xuICAgIHk6IG51bGwsXG4gICAgeDogbnVsbCxcbiAgICBzaGlwOiBudWxsLFxuICB9LFxuICBjcnVpc2VyOiB7XG4gICAgeTogbnVsbCxcbiAgICB4OiBudWxsLFxuICAgIHNoaXA6IG51bGwsXG4gIH0sXG4gIHN1Ym1hcmluZToge1xuICAgIHk6IG51bGwsXG4gICAgeDogbnVsbCxcbiAgICBzaGlwOiBudWxsLFxuICB9LFxuICBkZXN0cm95ZXI6IHtcbiAgICB5OiBudWxsLFxuICAgIHg6IG51bGwsXG4gICAgc2hpcDogbnVsbCxcbiAgfSxcbn07XG5cbmxldCBvcHBvbmVudFNoaXBzID0ge1xuICBjYXJyaWVyOiB7XG4gICAgeTogbnVsbCxcbiAgICB4OiBudWxsLFxuICAgIHNoaXA6IG51bGwsXG4gIH0sXG4gIGJhdHRsZXNoaXA6IHtcbiAgICB5OiBudWxsLFxuICAgIHg6IG51bGwsXG4gICAgc2hpcDogbnVsbCxcbiAgfSxcbiAgY3J1aXNlcjoge1xuICAgIHk6IG51bGwsXG4gICAgeDogbnVsbCxcbiAgICBzaGlwOiBudWxsLFxuICB9LFxuICBzdWJtYXJpbmU6IHtcbiAgICB5OiBudWxsLFxuICAgIHg6IG51bGwsXG4gICAgc2hpcDogbnVsbCxcbiAgfSxcbiAgZGVzdHJveWVyOiB7XG4gICAgeTogbnVsbCxcbiAgICB4OiBudWxsLFxuICAgIHNoaXA6IG51bGwsXG4gIH0sXG59O1xuXG5jb25zdCBwbGF5ZXJDYXJyaWVyID0gY3JlYXRlU2hpcCg1KTtcbmNvbnN0IHBsYXllckJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKDQpO1xuY29uc3QgcGxheWVyQ3J1aXNlciA9IGNyZWF0ZVNoaXAoMyk7XG5jb25zdCBwbGF5ZXJTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKDMpO1xuY29uc3QgcGxheWVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgyKTtcblxuY29uc3Qgb3Bwb25lbnRDYXJyaWVyID0gY3JlYXRlU2hpcCg1KTtcbmNvbnN0IG9wcG9uZW50QmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoNCk7XG5jb25zdCBvcHBvbmVudENydWlzZXIgPSBjcmVhdGVTaGlwKDMpO1xuY29uc3Qgb3Bwb25lbnRTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKDMpO1xuY29uc3Qgb3Bwb25lbnREZXN0cm95ZXIgPSBjcmVhdGVTaGlwKDIpO1xuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xucGxheWVyQm9hcmQuc2V0KCk7XG5jb25zdCBvcHBvbmVudEJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG5vcHBvbmVudEJvYXJkLnNldCgpO1xuXG5kaXNwbGF5R2FtZWJvYXJkcygpO1xuXG4vL1BsYXllciBTaGlwIHBsYWNlbWVudFxuZGlzcGxheVNoaXBIb3Jpem9udGFsbHkocGxheWVyQm9hcmQsIHBsYXllckNhcnJpZXIubGVuZ3RoLCAwLCAwLCAncGxheWVyJyk7XG5wbGF5ZXJTaGlwcy5jYXJyaWVyLnkgPSAwO1xucGxheWVyU2hpcHMuY2Fycmllci54ID0gMDtcbnBsYXllclNoaXBzLmNhcnJpZXIuc2hpcCA9IHBsYXllckNhcnJpZXI7XG5kaXNwbGF5U2hpcFZlcnRpY2FsbHkocGxheWVyQm9hcmQsIHBsYXllckJhdHRsZXNoaXAubGVuZ3RoLCAyLCAyLCAncGxheWVyJyk7XG5wbGF5ZXJTaGlwcy5iYXR0bGVzaGlwLnkgPSAyO1xucGxheWVyU2hpcHMuYmF0dGxlc2hpcC54ID0gMjtcbnBsYXllclNoaXBzLmJhdHRsZXNoaXAuc2hpcCA9IHBsYXllckJhdHRsZXNoaXA7XG5kaXNwbGF5U2hpcEhvcml6b250YWxseShwbGF5ZXJCb2FyZCwgcGxheWVyQ3J1aXNlci5sZW5ndGgsIDksIDAsICdwbGF5ZXInKTtcbnBsYXllclNoaXBzLmNydWlzZXIueSA9IDk7XG5wbGF5ZXJTaGlwcy5jcnVpc2VyLnggPSAwO1xucGxheWVyU2hpcHMuY3J1aXNlci5zaGlwID0gcGxheWVyQ3J1aXNlcjtcbmRpc3BsYXlTaGlwSG9yaXpvbnRhbGx5KHBsYXllckJvYXJkLCBwbGF5ZXJTdWJtYXJpbmUubGVuZ3RoLCA1LCA1LCAncGxheWVyJyk7XG5wbGF5ZXJTaGlwcy5zdWJtYXJpbmUueSA9IDU7XG5wbGF5ZXJTaGlwcy5zdWJtYXJpbmUueCA9IDU7XG5wbGF5ZXJTaGlwcy5zdWJtYXJpbmUuc2hpcCA9IHBsYXllclN1Ym1hcmluZTtcbmRpc3BsYXlTaGlwVmVydGljYWxseShwbGF5ZXJCb2FyZCwgcGxheWVyRGVzdHJveWVyLmxlbmd0aCwgMCwgOSwgJ3BsYXllcicpO1xucGxheWVyU2hpcHMuZGVzdHJveWVyLnkgPSAwO1xucGxheWVyU2hpcHMuZGVzdHJveWVyLnggPSA5O1xucGxheWVyU2hpcHMuZGVzdHJveWVyLnNoaXAgPSBwbGF5ZXJEZXN0cm95ZXI7XG5cbi8vT3Bwb25lbnRzIFNoaXAgcGxhY2VtZW50XG5kaXNwbGF5U2hpcEhvcml6b250YWxseShcbiAgb3Bwb25lbnRCb2FyZCxcbiAgb3Bwb25lbnRDYXJyaWVyLmxlbmd0aCxcbiAgMCxcbiAgMCxcbiAgJ29wcG9uZW50J1xuKTtcbm9wcG9uZW50U2hpcHMuY2Fycmllci55ID0gMDtcbm9wcG9uZW50U2hpcHMuY2Fycmllci54ID0gMDtcbm9wcG9uZW50U2hpcHMuY2Fycmllci5zaGlwID0gb3Bwb25lbnRDYXJyaWVyO1xuZGlzcGxheVNoaXBWZXJ0aWNhbGx5KFxuICBvcHBvbmVudEJvYXJkLFxuICBvcHBvbmVudEJhdHRsZXNoaXAubGVuZ3RoLFxuICAyLFxuICAyLFxuICAnb3Bwb25lbnQnXG4pO1xub3Bwb25lbnRTaGlwcy5iYXR0bGVzaGlwLnkgPSAyO1xub3Bwb25lbnRTaGlwcy5iYXR0bGVzaGlwLnggPSAyO1xub3Bwb25lbnRTaGlwcy5iYXR0bGVzaGlwLnNoaXAgPSBvcHBvbmVudEJhdHRsZXNoaXA7XG5kaXNwbGF5U2hpcEhvcml6b250YWxseShcbiAgb3Bwb25lbnRCb2FyZCxcbiAgb3Bwb25lbnRDcnVpc2VyLmxlbmd0aCxcbiAgOSxcbiAgMCxcbiAgJ29wcG9uZW50J1xuKTtcbm9wcG9uZW50U2hpcHMuY3J1aXNlci55ID0gOTtcbm9wcG9uZW50U2hpcHMuY3J1aXNlci54ID0gMDtcbm9wcG9uZW50U2hpcHMuY3J1aXNlci5zaGlwID0gb3Bwb25lbnRDcnVpc2VyO1xuZGlzcGxheVNoaXBIb3Jpem9udGFsbHkoXG4gIG9wcG9uZW50Qm9hcmQsXG4gIG9wcG9uZW50U3VibWFyaW5lLmxlbmd0aCxcbiAgNSxcbiAgNSxcbiAgJ29wcG9uZW50J1xuKTtcbm9wcG9uZW50U2hpcHMuc3VibWFyaW5lLnkgPSA1O1xub3Bwb25lbnRTaGlwcy5zdWJtYXJpbmUueCA9IDU7XG5vcHBvbmVudFNoaXBzLnN1Ym1hcmluZS5zaGlwID0gb3Bwb25lbnRTdWJtYXJpbmU7XG5kaXNwbGF5U2hpcFZlcnRpY2FsbHkoXG4gIG9wcG9uZW50Qm9hcmQsXG4gIG9wcG9uZW50RGVzdHJveWVyLmxlbmd0aCxcbiAgMCxcbiAgOSxcbiAgJ29wcG9uZW50J1xuKTtcbm9wcG9uZW50U2hpcHMuZGVzdHJveWVyLnkgPSAwO1xub3Bwb25lbnRTaGlwcy5kZXN0cm95ZXIueCA9IDk7XG5vcHBvbmVudFNoaXBzLmRlc3Ryb3llci5zaGlwID0gb3Bwb25lbnREZXN0cm95ZXI7XG5cbnBsYXllclR1cm4gPSB0cnVlO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIHJhbmRvbVkgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA5KTtcbiAgcmFuZG9tWCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDkpO1xuICBpZiAoZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkID09ICdvcHBvbmVudC1ib2FyZCcpIHtcbiAgICBjaGVja0NvcnJlY3RTaGlwKGUudGFyZ2V0LCBvcHBvbmVudFNoaXBzLCBvcHBvbmVudEJvYXJkLCAnb3Bwb25lbnQnKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzVdXG4gICAgICAgIC5jaGlsZHJlbls1XVxuICAgICk7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgLy9jb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnRFbGVtZW50KTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuW1xuICAgICAgICByYW5kb21ZXG4gICAgICBdLmNoaWxkcmVuW3JhbmRvbVhdXG4gICAgKTtcbiAgICBjaGVja0NvcnJlY3RTaGlwKFxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bXG4gICAgICAgIHJhbmRvbVlcbiAgICAgIF0uY2hpbGRyZW5bcmFuZG9tWF0sXG4gICAgICBwbGF5ZXJTaGlwcyxcbiAgICAgIHBsYXllckJvYXJkLFxuICAgICAgJ3BsYXllcidcbiAgICApO1xuICB9XG59KTtcblxuY29uc29sZS5sb2cocGxheWVyQm9hcmQuZ2V0R2FtZWJvYXJkKCkpO1xuY29uc29sZS5sb2cob3Bwb25lbnRCb2FyZC5nZXRHYW1lYm9hcmQoKSk7XG5jb25zb2xlLmxvZyhvcHBvbmVudENhcnJpZXIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9