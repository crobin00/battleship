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
/* harmony export */   "attackShip": () => (/* binding */ attackShip),
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
    e.target.classList.contains('horizontal') &&
    parseInt(e.target.parentElement.dataset.row) === allShips.carrier.y &&
    parseInt(e.target.dataset.col) >= allShips.carrier.x &&
    parseInt(e.target.dataset.col) <
      allShips.carrier.x + allShips.carrier.ship.length
  ) {
    console.log('opponent carrier');
    attackShip(
      board,
      e.target.parentElement.dataset.row,
      e.target.dataset.col,
      selectBoardDiv,
      allShips.carrier.ship
    );
  } else if (
    e.target.classList.contains('vertical') &&
    parseInt(e.target.dataset.col) === allShips.carrier.x &&
    parseInt(e.target.parentElement.dataset.row) >= allShips.carrier.y &&
    parseInt(e.target.parentElement.dataset.row) <
      allShips.carrier.y + allShips.carrier.ship.length
  ) {
    console.log('opponent carrier');
    attackShip(
      board,
      e.target.parentElement.dataset.row,
      e.target.dataset.col,
      selectBoardDiv,
      allShips.carrier.ship
    );
  } else if (
    e.target.classList.contains('horizontal') &&
    parseInt(e.target.parentElement.dataset.row) === allShips.battleship.y &&
    parseInt(e.target.dataset.col) >= allShips.battleship.x &&
    parseInt(e.target.dataset.col) <
      allShips.battleship.x + allShips.battleship.ship.length
  ) {
    console.log('opponent battleship');
    attackShip(
      board,
      e.target.parentElement.dataset.row,
      e.target.dataset.col,
      selectBoardDiv,
      allShips.battleship.ship
    );
  } else if (
    e.target.classList.contains('vertical') &&
    parseInt(e.target.dataset.col) === allShips.battleship.x &&
    parseInt(e.target.parentElement.dataset.row) >= allShips.battleship.y &&
    parseInt(e.target.parentElement.dataset.row) <
      allShips.battleship.y + allShips.battleship.ship.length
  ) {
    console.log('opponent battleship');
    attackShip(
      board,
      e.target.parentElement.dataset.row,
      e.target.dataset.col,
      selectBoardDiv,
      allShips.battleship.ship
    );
  }
  if (
    e.target.classList.contains('horizontal') &&
    parseInt(e.target.parentElement.dataset.row) === allShips.cruiser.y &&
    parseInt(e.target.dataset.col) >= allShips.cruiser.x &&
    parseInt(e.target.dataset.col) <
      allShips.cruiser.x + allShips.cruiser.ship.length
  ) {
    console.log('opponent cruiser');
    attackShip(
      board,
      e.target.parentElement.dataset.row,
      e.target.dataset.col,
      selectBoardDiv,
      allShips.cruiser.ship
    );
  } else if (
    e.target.classList.contains('vertical') &&
    parseInt(e.target.dataset.col) === allShips.cruiser.x &&
    parseInt(e.target.parentElement.dataset.row) >= allShips.cruiser.y &&
    parseInt(e.target.parentElement.dataset.row) <
      allShips.cruiser.y + allShips.cruiser.ship.length
  ) {
    console.log('opponent cruiser');
    attackShip(
      board,
      e.target.parentElement.dataset.row,
      e.target.dataset.col,
      selectBoardDiv,
      allShips.cruiser.ship
    );
  }
  if (
    e.target.classList.contains('horizontal') &&
    parseInt(e.target.parentElement.dataset.row) === allShips.submarine.y &&
    parseInt(e.target.dataset.col) >= allShips.submarine.x &&
    parseInt(e.target.dataset.col) <
      allShips.submarine.x + allShips.submarine.ship.length
  ) {
    console.log('opponent submarine');
    attackShip(
      board,
      e.target.parentElement.dataset.row,
      e.target.dataset.col,
      selectBoardDiv,
      allShips.submarine.ship
    );
  } else if (
    e.target.classList.contains('vertical') &&
    parseInt(e.target.dataset.col) === allShips.submarine.x &&
    parseInt(e.target.parentElement.dataset.row) >= allShips.submarine.y &&
    parseInt(e.target.parentElement.dataset.row) <
      allShips.submarine.y + allShips.submarine.ship.length
  ) {
    console.log('opponent submarine');
    attackShip(
      board,
      e.target.parentElement.dataset.row,
      e.target.dataset.col,
      selectBoardDiv,
      allShips.submarine.ship
    );
  }
  if (
    e.target.classList.contains('horizontal') &&
    parseInt(e.target.parentElement.dataset.row) === allShips.destroyer.y &&
    parseInt(e.target.dataset.col) >= allShips.destroyer.x &&
    parseInt(e.target.dataset.col) <
      allShips.destroyer.x + allShips.destroyer.ship.length
  ) {
    console.log('opponent destroyer');
    attackShip(
      board,
      e.target.parentElement.dataset.row,
      e.target.dataset.col,
      selectBoardDiv,
      allShips.destroyer.ship
    );
  } else if (
    e.target.classList.contains('vertical') &&
    parseInt(e.target.dataset.col) === allShips.destroyer.x &&
    parseInt(e.target.parentElement.dataset.row) >= allShips.destroyer.y &&
    parseInt(e.target.parentElement.dataset.row) <
      allShips.destroyer.y + allShips.destroyer.ship.length
  ) {
    console.log('opponent destroyer');
    attackShip(
      board,
      e.target.parentElement.dataset.row,
      e.target.dataset.col,
      selectBoardDiv,
      allShips.destroyer.ship
    );
  } else if (
    !e.target.classList.contains('horizontal') &&
    !e.target.classList.contains('vertical')
  ) {
    console.log('miss');
    attackShip(
      board,
      e.target.parentElement.dataset.row,
      e.target.dataset.col,
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

/*attackShip(playerBoard, playerShips.carrier.ship, 0, 0, 'player');
attackShip(playerBoard, playerShips.carrier.ship, 0, 4, 'player');
attackShip(playerBoard, playerShips.carrier.ship, 7, 7, 'player');
attackShip(opponentBoard, opponentShips.carrier.ship, 7, 7, 'opponent');
attackShip(opponentBoard, opponentShips.carrier.ship, 2, 2, 'opponent');*/

opponentDiv.addEventListener('click', (e) => {
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.checkCorrectShip)(e, opponentShips, opponentBoard, 'opponent');
  console.log(e.target);
  console.log(e.target.parentElement);
});

console.log(playerBoard.getGameboard());
console.log(opponentBoard.getGameboard());
console.log(opponentCarrier);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLGlFQUFpRSxFQUFFO0FBQ25FLCtEQUErRCxFQUFFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLEVBQUU7QUFDckUsK0RBQStELEVBQUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixRQUFRO0FBQzFCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSxpRUFBaUUsRUFBRTtBQUNuRSwrREFBK0QsRUFBRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxFQUFFO0FBQ3JFLCtEQUErRCxFQUFFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSxpRUFBaUUsRUFBRTtBQUNuRSwrREFBK0QsRUFBRTtBQUNqRTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLEVBQUU7QUFDckUsK0RBQStELEVBQUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxFQUFFO0FBQ25FLCtEQUErRCxFQUFFO0FBQ2pFO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLEVBQUU7QUFDckUsK0RBQStELEVBQUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFOztBQUV4RTtBQUNBLEVBQUUseURBQWdCO0FBQ2xCO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHtcbiAgZGlzcGxheUdhbWVib2FyZHMsXG4gIGRpc3BsYXlTaGlwSG9yaXpvbnRhbGx5LFxuICBkaXNwbGF5U2hpcFZlcnRpY2FsbHksXG4gIGF0dGFja1NoaXAsXG4gIGNoZWNrQ29ycmVjdFNoaXAsXG59O1xuXG4vL0NyZWF0ZXMgMTB4MTAgZGl2IGVsZW1lbnRzXG5mdW5jdGlvbiBkaXNwbGF5R2FtZWJvYXJkcygpIHtcbiAgY29uc3QgcGxheWVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1ib2FyZCcpO1xuICBjb25zdCBvcHBvbmVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcHBvbmVudC1ib2FyZCcpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGNvbnN0IHJvd3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByb3dzLmNsYXNzTGlzdC5hZGQoJ3Jvd3MnKTtcbiAgICByb3dzLmRhdGFzZXQucm93ID0gaTtcbiAgICBwbGF5ZXJEaXYuYXBwZW5kQ2hpbGQocm93cyk7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBjb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb2xzLmNsYXNzTGlzdC5hZGQoJ2NvbHMnKTtcbiAgICAgIGNvbHMuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgcm93cy5hcHBlbmRDaGlsZChjb2xzKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCByb3dzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm93cy5jbGFzc0xpc3QuYWRkKCdyb3dzJyk7XG4gICAgcm93cy5kYXRhc2V0LnJvdyA9IGk7XG4gICAgb3Bwb25lbnREaXYuYXBwZW5kQ2hpbGQocm93cyk7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBjb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb2xzLmNsYXNzTGlzdC5hZGQoJ2NvbHMnKTtcbiAgICAgIGNvbHMuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgcm93cy5hcHBlbmRDaGlsZChjb2xzKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheVNoaXBIb3Jpem9udGFsbHkoXG4gIGJvYXJkLFxuICBzaGlwTGVuZ3RoLFxuICB5Q29yZCxcbiAgeENvcmQsXG4gIHNlbGVjdEJvYXJkRGl2XG4pIHtcbiAgYm9hcmQucGxhY2VTaGlwc0hvcml6b250YWxseShzaGlwTGVuZ3RoLCB5Q29yZCwgeENvcmQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgaWYgKGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnc2hpcCcgJiYgc2VsZWN0Qm9hcmREaXYgPT0gJ3BsYXllcicpIHtcbiAgICAgICAgY29uc3QgcGxheWVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1ib2FyZCcpO1xuICAgICAgICBjb25zdCBzaGlwUm93RGl2ID0gcGxheWVyRGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz0nJHtpfSddYCk7XG4gICAgICAgIGNvbnN0IHNoaXBEaXYgPSBzaGlwUm93RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvbD0nJHtqfSddYCk7XG4gICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICBpZiAoIXNoaXBEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJ0aWNhbCcpKSB7XG4gICAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCdob3Jpem9udGFsJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnc2hpcCcgJiZcbiAgICAgICAgc2VsZWN0Qm9hcmREaXYgPT0gJ29wcG9uZW50J1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG9wcG9uZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wcG9uZW50LWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHNoaXBSb3dEaXYgPSBvcHBvbmVudERpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgaWYgKCFzaGlwRGl2LmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSkge1xuICAgICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZCgnaG9yaXpvbnRhbCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTaGlwVmVydGljYWxseShcbiAgYm9hcmQsXG4gIHNoaXBMZW5ndGgsXG4gIHlDb3JkLFxuICB4Q29yZCxcbiAgc2VsZWN0Qm9hcmREaXZcbikge1xuICBib2FyZC5wbGFjZVNoaXBzVmVydGljYWxseShzaGlwTGVuZ3RoLCB5Q29yZCwgeENvcmQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgaWYgKGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnc2hpcCcgJiYgc2VsZWN0Qm9hcmREaXYgPT0gJ3BsYXllcicpIHtcbiAgICAgICAgY29uc3QgcGxheWVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1ib2FyZCcpO1xuICAgICAgICBjb25zdCBzaGlwUm93RGl2ID0gcGxheWVyRGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz0nJHtpfSddYCk7XG4gICAgICAgIGNvbnN0IHNoaXBEaXYgPSBzaGlwUm93RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvbD0nJHtqfSddYCk7XG4gICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICBpZiAoIXNoaXBEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdob3Jpem9udGFsJykpIHtcbiAgICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ3ZlcnRpY2FsJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnc2hpcCcgJiZcbiAgICAgICAgc2VsZWN0Qm9hcmREaXYgPT0gJ29wcG9uZW50J1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG9wcG9uZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wcG9uZW50LWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHNoaXBSb3dEaXYgPSBvcHBvbmVudERpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgaWYgKCFzaGlwRGl2LmNsYXNzTGlzdC5jb250YWlucygnaG9yaXpvbnRhbCcpKSB7XG4gICAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCd2ZXJ0aWNhbCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGF0dGFja1NoaXAoYm9hcmQsIHlDb3JkLCB4Q29yZCwgc2VsZWN0Qm9hcmREaXYsIHNoaXAgPSBudWxsKSB7XG4gIGJvYXJkLnJlY2VpdmVBdHRhY2soc2hpcCwgeUNvcmQsIHhDb3JkKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBpZiAoYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09ICdoaXQnICYmIHNlbGVjdEJvYXJkRGl2ID09ICdwbGF5ZXInKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKTtcbiAgICAgICAgY29uc3Qgc2hpcFJvd0RpdiA9IHBsYXllckRpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnaGl0JyAmJlxuICAgICAgICBzZWxlY3RCb2FyZERpdiA9PSAnb3Bwb25lbnQnXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgb3Bwb25lbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3Bwb25lbnQtYm9hcmQnKTtcbiAgICAgICAgY29uc3Qgc2hpcFJvd0RpdiA9IG9wcG9uZW50RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz0nJHtpfSddYCk7XG4gICAgICAgIGNvbnN0IHNoaXBEaXYgPSBzaGlwUm93RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvbD0nJHtqfSddYCk7XG4gICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xuICAgICAgfVxuICAgICAgaWYgKGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnbWlzcycgJiYgc2VsZWN0Qm9hcmREaXYgPT0gJ3BsYXllcicpIHtcbiAgICAgICAgY29uc3QgcGxheWVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1ib2FyZCcpO1xuICAgICAgICBjb25zdCBzaGlwUm93RGl2ID0gcGxheWVyRGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz0nJHtpfSddYCk7XG4gICAgICAgIGNvbnN0IHNoaXBEaXYgPSBzaGlwUm93RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvbD0nJHtqfSddYCk7XG4gICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09ICdtaXNzJyAmJlxuICAgICAgICBzZWxlY3RCb2FyZERpdiA9PSAnb3Bwb25lbnQnXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgb3Bwb25lbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3Bwb25lbnQtYm9hcmQnKTtcbiAgICAgICAgY29uc3Qgc2hpcFJvd0RpdiA9IG9wcG9uZW50RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz0nJHtpfSddYCk7XG4gICAgICAgIGNvbnN0IHNoaXBEaXYgPSBzaGlwUm93RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvbD0nJHtqfSddYCk7XG4gICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0NvcnJlY3RTaGlwKGUsIGFsbFNoaXBzLCBib2FyZCwgc2VsZWN0Qm9hcmREaXYpIHtcbiAgaWYgKFxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaG9yaXpvbnRhbCcpICYmXG4gICAgcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdykgPT09IGFsbFNoaXBzLmNhcnJpZXIueSAmJlxuICAgIHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sKSA+PSBhbGxTaGlwcy5jYXJyaWVyLnggJiZcbiAgICBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCkgPFxuICAgICAgYWxsU2hpcHMuY2Fycmllci54ICsgYWxsU2hpcHMuY2Fycmllci5zaGlwLmxlbmd0aFxuICApIHtcbiAgICBjb25zb2xlLmxvZygnb3Bwb25lbnQgY2FycmllcicpO1xuICAgIGF0dGFja1NoaXAoXG4gICAgICBib2FyZCxcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3csXG4gICAgICBlLnRhcmdldC5kYXRhc2V0LmNvbCxcbiAgICAgIHNlbGVjdEJvYXJkRGl2LFxuICAgICAgYWxsU2hpcHMuY2Fycmllci5zaGlwXG4gICAgKTtcbiAgfSBlbHNlIGlmIChcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3ZlcnRpY2FsJykgJiZcbiAgICBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCkgPT09IGFsbFNoaXBzLmNhcnJpZXIueCAmJlxuICAgIHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3cpID49IGFsbFNoaXBzLmNhcnJpZXIueSAmJlxuICAgIHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3cpIDxcbiAgICAgIGFsbFNoaXBzLmNhcnJpZXIueSArIGFsbFNoaXBzLmNhcnJpZXIuc2hpcC5sZW5ndGhcbiAgKSB7XG4gICAgY29uc29sZS5sb2coJ29wcG9uZW50IGNhcnJpZXInKTtcbiAgICBhdHRhY2tTaGlwKFxuICAgICAgYm9hcmQsXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93LFxuICAgICAgZS50YXJnZXQuZGF0YXNldC5jb2wsXG4gICAgICBzZWxlY3RCb2FyZERpdixcbiAgICAgIGFsbFNoaXBzLmNhcnJpZXIuc2hpcFxuICAgICk7XG4gIH0gZWxzZSBpZiAoXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdob3Jpem9udGFsJykgJiZcbiAgICBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA9PT0gYWxsU2hpcHMuYmF0dGxlc2hpcC55ICYmXG4gICAgcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2wpID49IGFsbFNoaXBzLmJhdHRsZXNoaXAueCAmJlxuICAgIHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sKSA8XG4gICAgICBhbGxTaGlwcy5iYXR0bGVzaGlwLnggKyBhbGxTaGlwcy5iYXR0bGVzaGlwLnNoaXAubGVuZ3RoXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdvcHBvbmVudCBiYXR0bGVzaGlwJyk7XG4gICAgYXR0YWNrU2hpcChcbiAgICAgIGJvYXJkLFxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdyxcbiAgICAgIGUudGFyZ2V0LmRhdGFzZXQuY29sLFxuICAgICAgc2VsZWN0Qm9hcmREaXYsXG4gICAgICBhbGxTaGlwcy5iYXR0bGVzaGlwLnNoaXBcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSAmJlxuICAgIHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sKSA9PT0gYWxsU2hpcHMuYmF0dGxlc2hpcC54ICYmXG4gICAgcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdykgPj0gYWxsU2hpcHMuYmF0dGxlc2hpcC55ICYmXG4gICAgcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdykgPFxuICAgICAgYWxsU2hpcHMuYmF0dGxlc2hpcC55ICsgYWxsU2hpcHMuYmF0dGxlc2hpcC5zaGlwLmxlbmd0aFxuICApIHtcbiAgICBjb25zb2xlLmxvZygnb3Bwb25lbnQgYmF0dGxlc2hpcCcpO1xuICAgIGF0dGFja1NoaXAoXG4gICAgICBib2FyZCxcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3csXG4gICAgICBlLnRhcmdldC5kYXRhc2V0LmNvbCxcbiAgICAgIHNlbGVjdEJvYXJkRGl2LFxuICAgICAgYWxsU2hpcHMuYmF0dGxlc2hpcC5zaGlwXG4gICAgKTtcbiAgfVxuICBpZiAoXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdob3Jpem9udGFsJykgJiZcbiAgICBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA9PT0gYWxsU2hpcHMuY3J1aXNlci55ICYmXG4gICAgcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2wpID49IGFsbFNoaXBzLmNydWlzZXIueCAmJlxuICAgIHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sKSA8XG4gICAgICBhbGxTaGlwcy5jcnVpc2VyLnggKyBhbGxTaGlwcy5jcnVpc2VyLnNoaXAubGVuZ3RoXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdvcHBvbmVudCBjcnVpc2VyJyk7XG4gICAgYXR0YWNrU2hpcChcbiAgICAgIGJvYXJkLFxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdyxcbiAgICAgIGUudGFyZ2V0LmRhdGFzZXQuY29sLFxuICAgICAgc2VsZWN0Qm9hcmREaXYsXG4gICAgICBhbGxTaGlwcy5jcnVpc2VyLnNoaXBcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSAmJlxuICAgIHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sKSA9PT0gYWxsU2hpcHMuY3J1aXNlci54ICYmXG4gICAgcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdykgPj0gYWxsU2hpcHMuY3J1aXNlci55ICYmXG4gICAgcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdykgPFxuICAgICAgYWxsU2hpcHMuY3J1aXNlci55ICsgYWxsU2hpcHMuY3J1aXNlci5zaGlwLmxlbmd0aFxuICApIHtcbiAgICBjb25zb2xlLmxvZygnb3Bwb25lbnQgY3J1aXNlcicpO1xuICAgIGF0dGFja1NoaXAoXG4gICAgICBib2FyZCxcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3csXG4gICAgICBlLnRhcmdldC5kYXRhc2V0LmNvbCxcbiAgICAgIHNlbGVjdEJvYXJkRGl2LFxuICAgICAgYWxsU2hpcHMuY3J1aXNlci5zaGlwXG4gICAgKTtcbiAgfVxuICBpZiAoXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdob3Jpem9udGFsJykgJiZcbiAgICBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA9PT0gYWxsU2hpcHMuc3VibWFyaW5lLnkgJiZcbiAgICBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCkgPj0gYWxsU2hpcHMuc3VibWFyaW5lLnggJiZcbiAgICBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCkgPFxuICAgICAgYWxsU2hpcHMuc3VibWFyaW5lLnggKyBhbGxTaGlwcy5zdWJtYXJpbmUuc2hpcC5sZW5ndGhcbiAgKSB7XG4gICAgY29uc29sZS5sb2coJ29wcG9uZW50IHN1Ym1hcmluZScpO1xuICAgIGF0dGFja1NoaXAoXG4gICAgICBib2FyZCxcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3csXG4gICAgICBlLnRhcmdldC5kYXRhc2V0LmNvbCxcbiAgICAgIHNlbGVjdEJvYXJkRGl2LFxuICAgICAgYWxsU2hpcHMuc3VibWFyaW5lLnNoaXBcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSAmJlxuICAgIHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sKSA9PT0gYWxsU2hpcHMuc3VibWFyaW5lLnggJiZcbiAgICBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA+PSBhbGxTaGlwcy5zdWJtYXJpbmUueSAmJlxuICAgIHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3cpIDxcbiAgICAgIGFsbFNoaXBzLnN1Ym1hcmluZS55ICsgYWxsU2hpcHMuc3VibWFyaW5lLnNoaXAubGVuZ3RoXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdvcHBvbmVudCBzdWJtYXJpbmUnKTtcbiAgICBhdHRhY2tTaGlwKFxuICAgICAgYm9hcmQsXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93LFxuICAgICAgZS50YXJnZXQuZGF0YXNldC5jb2wsXG4gICAgICBzZWxlY3RCb2FyZERpdixcbiAgICAgIGFsbFNoaXBzLnN1Ym1hcmluZS5zaGlwXG4gICAgKTtcbiAgfVxuICBpZiAoXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdob3Jpem9udGFsJykgJiZcbiAgICBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA9PT0gYWxsU2hpcHMuZGVzdHJveWVyLnkgJiZcbiAgICBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCkgPj0gYWxsU2hpcHMuZGVzdHJveWVyLnggJiZcbiAgICBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCkgPFxuICAgICAgYWxsU2hpcHMuZGVzdHJveWVyLnggKyBhbGxTaGlwcy5kZXN0cm95ZXIuc2hpcC5sZW5ndGhcbiAgKSB7XG4gICAgY29uc29sZS5sb2coJ29wcG9uZW50IGRlc3Ryb3llcicpO1xuICAgIGF0dGFja1NoaXAoXG4gICAgICBib2FyZCxcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3csXG4gICAgICBlLnRhcmdldC5kYXRhc2V0LmNvbCxcbiAgICAgIHNlbGVjdEJvYXJkRGl2LFxuICAgICAgYWxsU2hpcHMuZGVzdHJveWVyLnNoaXBcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndmVydGljYWwnKSAmJlxuICAgIHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sKSA9PT0gYWxsU2hpcHMuZGVzdHJveWVyLnggJiZcbiAgICBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93KSA+PSBhbGxTaGlwcy5kZXN0cm95ZXIueSAmJlxuICAgIHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5yb3cpIDxcbiAgICAgIGFsbFNoaXBzLmRlc3Ryb3llci55ICsgYWxsU2hpcHMuZGVzdHJveWVyLnNoaXAubGVuZ3RoXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdvcHBvbmVudCBkZXN0cm95ZXInKTtcbiAgICBhdHRhY2tTaGlwKFxuICAgICAgYm9hcmQsXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQucm93LFxuICAgICAgZS50YXJnZXQuZGF0YXNldC5jb2wsXG4gICAgICBzZWxlY3RCb2FyZERpdixcbiAgICAgIGFsbFNoaXBzLmRlc3Ryb3llci5zaGlwXG4gICAgKTtcbiAgfSBlbHNlIGlmIChcbiAgICAhZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdob3Jpem9udGFsJykgJiZcbiAgICAhZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJ0aWNhbCcpXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdtaXNzJyk7XG4gICAgYXR0YWNrU2hpcChcbiAgICAgIGJvYXJkLFxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LnJvdyxcbiAgICAgIGUudGFyZ2V0LmRhdGFzZXQuY29sLFxuICAgICAgc2VsZWN0Qm9hcmREaXZcbiAgICApO1xuICB9XG59XG4iLCJleHBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfTtcbmltcG9ydCB7IGNyZWF0ZVNoaXAgfSBmcm9tICcuL3NoaXBzLmpzJztcblxuY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBnYW1lYm9hcmQgPSBbXTtcblxuICAvL0luaXRpYWxseSBjcmVhdGlvbiBvZiAxMHgxMCBnYW1lYm9hcmQgYXJyYXlcbiAgY29uc3Qgc2V0ID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZ2FtZWJvYXJkLnB1c2goW10pO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGdhbWVib2FyZFtpXS5wdXNoKCcnKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwc0hvcml6b250YWxseSA9IGZ1bmN0aW9uIChzaGlwTGVuZ3RoLCB5Q29yZCwgeENvcmQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgZ2FtZWJvYXJkW3lDb3JkXVt4Q29yZCArIGldID0gJ3NoaXAnO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXBzVmVydGljYWxseSA9IGZ1bmN0aW9uIChzaGlwTGVuZ3RoLCB5Q29yZCwgeENvcmQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgZ2FtZWJvYXJkW3lDb3JkICsgaV1beENvcmRdID0gJ3NoaXAnO1xuICAgIH1cbiAgfTtcblxuICAvL1JlY2VpdmVzIGNvb3JkaW5hdGVzIGFuZCBkZXRlcm1pbmVzIHdoZXRoZXIgdGhvc2UgY29vcmRzIGhpdCBhIHNoaXAgb3Igbm90XG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbiAoc2hpcCwgeUNvcmQsIHhDb3JkKSB7XG4gICAgaWYgKGdhbWVib2FyZFt5Q29yZF1beENvcmRdID09PSAnc2hpcCcpIHtcbiAgICAgIGdhbWVib2FyZFt5Q29yZF1beENvcmRdID0gJ2hpdCc7XG4gICAgICBzaGlwLmhpdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnYW1lYm9hcmRbeUNvcmRdW3hDb3JkXSA9ICdtaXNzJztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0R2FtZWJvYXJkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnYW1lYm9hcmQ7XG4gIH07XG4gIHJldHVybiB7XG4gICAgc2V0LFxuICAgIHBsYWNlU2hpcHNIb3Jpem9udGFsbHksXG4gICAgcGxhY2VTaGlwc1ZlcnRpY2FsbHksXG4gICAgZ2V0R2FtZWJvYXJkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gIH07XG59O1xuIiwiZXhwb3J0IHsgY3JlYXRlU2hpcCB9O1xuaW1wb3J0IHsgY3JlYXRlR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQuanMnO1xuXG5jb25zdCBjcmVhdGVTaGlwID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICBjb25zdCBwb3NpdGlvbkhpdCA9IFtdO1xuICBjb25zdCBoaXQgPSAocG9zaXRpb24gPSB1bmRlZmluZWQpID0+IHtcbiAgICBpZiAocG9zaXRpb24gPiBsZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc2l0aW9uSGl0LnB1c2goJ2hpdCcpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGlmIChwb3NpdGlvbkhpdC5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uSGl0Lmxlbmd0aCA9PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHsgcG9zaXRpb25IaXQsIGhpdCwgaXNTdW5rLCBsZW5ndGggfTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkLmpzJztcbmltcG9ydCB7IGNyZWF0ZVNoaXAgfSBmcm9tICcuL3NoaXBzLmpzJztcbmltcG9ydCB7XG4gIGRpc3BsYXlHYW1lYm9hcmRzLFxuICBkaXNwbGF5U2hpcEhvcml6b250YWxseSxcbiAgZGlzcGxheVNoaXBWZXJ0aWNhbGx5LFxuICBhdHRhY2tTaGlwLFxuICBjaGVja0NvcnJlY3RTaGlwLFxufSBmcm9tICcuL2RvbS5qcyc7XG5cbmNvbnN0IG9wcG9uZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wcG9uZW50LWJvYXJkJyk7XG5sZXQgcGxheWVyVHVybiA9IGZhbHNlO1xubGV0IG9wcG9uZW50VHVybiA9IGZhbHNlO1xuXG5sZXQgcGxheWVyU2hpcHMgPSB7XG4gIGNhcnJpZXI6IHtcbiAgICB5OiBudWxsLFxuICAgIHg6IG51bGwsXG4gICAgc2hpcDogbnVsbCxcbiAgfSxcbiAgYmF0dGxlc2hpcDoge1xuICAgIHk6IG51bGwsXG4gICAgeDogbnVsbCxcbiAgICBzaGlwOiBudWxsLFxuICB9LFxuICBjcnVpc2VyOiB7XG4gICAgeTogbnVsbCxcbiAgICB4OiBudWxsLFxuICAgIHNoaXA6IG51bGwsXG4gIH0sXG4gIHN1Ym1hcmluZToge1xuICAgIHk6IG51bGwsXG4gICAgeDogbnVsbCxcbiAgICBzaGlwOiBudWxsLFxuICB9LFxuICBkZXN0cm95ZXI6IHtcbiAgICB5OiBudWxsLFxuICAgIHg6IG51bGwsXG4gICAgc2hpcDogbnVsbCxcbiAgfSxcbn07XG5cbmxldCBvcHBvbmVudFNoaXBzID0ge1xuICBjYXJyaWVyOiB7XG4gICAgeTogbnVsbCxcbiAgICB4OiBudWxsLFxuICAgIHNoaXA6IG51bGwsXG4gIH0sXG4gIGJhdHRsZXNoaXA6IHtcbiAgICB5OiBudWxsLFxuICAgIHg6IG51bGwsXG4gICAgc2hpcDogbnVsbCxcbiAgfSxcbiAgY3J1aXNlcjoge1xuICAgIHk6IG51bGwsXG4gICAgeDogbnVsbCxcbiAgICBzaGlwOiBudWxsLFxuICB9LFxuICBzdWJtYXJpbmU6IHtcbiAgICB5OiBudWxsLFxuICAgIHg6IG51bGwsXG4gICAgc2hpcDogbnVsbCxcbiAgfSxcbiAgZGVzdHJveWVyOiB7XG4gICAgeTogbnVsbCxcbiAgICB4OiBudWxsLFxuICAgIHNoaXA6IG51bGwsXG4gIH0sXG59O1xuXG5jb25zdCBwbGF5ZXJDYXJyaWVyID0gY3JlYXRlU2hpcCg1KTtcbmNvbnN0IHBsYXllckJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKDQpO1xuY29uc3QgcGxheWVyQ3J1aXNlciA9IGNyZWF0ZVNoaXAoMyk7XG5jb25zdCBwbGF5ZXJTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKDMpO1xuY29uc3QgcGxheWVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgyKTtcblxuY29uc3Qgb3Bwb25lbnRDYXJyaWVyID0gY3JlYXRlU2hpcCg1KTtcbmNvbnN0IG9wcG9uZW50QmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoNCk7XG5jb25zdCBvcHBvbmVudENydWlzZXIgPSBjcmVhdGVTaGlwKDMpO1xuY29uc3Qgb3Bwb25lbnRTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKDMpO1xuY29uc3Qgb3Bwb25lbnREZXN0cm95ZXIgPSBjcmVhdGVTaGlwKDIpO1xuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xucGxheWVyQm9hcmQuc2V0KCk7XG5jb25zdCBvcHBvbmVudEJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG5vcHBvbmVudEJvYXJkLnNldCgpO1xuXG5kaXNwbGF5R2FtZWJvYXJkcygpO1xuXG4vL1BsYXllciBTaGlwIHBsYWNlbWVudFxuZGlzcGxheVNoaXBIb3Jpem9udGFsbHkocGxheWVyQm9hcmQsIHBsYXllckNhcnJpZXIubGVuZ3RoLCAwLCAwLCAncGxheWVyJyk7XG5wbGF5ZXJTaGlwcy5jYXJyaWVyLnkgPSAwO1xucGxheWVyU2hpcHMuY2Fycmllci54ID0gMDtcbnBsYXllclNoaXBzLmNhcnJpZXIuc2hpcCA9IHBsYXllckNhcnJpZXI7XG5kaXNwbGF5U2hpcFZlcnRpY2FsbHkocGxheWVyQm9hcmQsIHBsYXllckJhdHRsZXNoaXAubGVuZ3RoLCAyLCAyLCAncGxheWVyJyk7XG5wbGF5ZXJTaGlwcy5iYXR0bGVzaGlwLnkgPSAyO1xucGxheWVyU2hpcHMuYmF0dGxlc2hpcC54ID0gMjtcbnBsYXllclNoaXBzLmJhdHRsZXNoaXAuc2hpcCA9IHBsYXllckJhdHRsZXNoaXA7XG5kaXNwbGF5U2hpcEhvcml6b250YWxseShwbGF5ZXJCb2FyZCwgcGxheWVyQ3J1aXNlci5sZW5ndGgsIDksIDAsICdwbGF5ZXInKTtcbnBsYXllclNoaXBzLmNydWlzZXIueSA9IDk7XG5wbGF5ZXJTaGlwcy5jcnVpc2VyLnggPSAwO1xucGxheWVyU2hpcHMuY3J1aXNlci5zaGlwID0gcGxheWVyQ3J1aXNlcjtcbmRpc3BsYXlTaGlwSG9yaXpvbnRhbGx5KHBsYXllckJvYXJkLCBwbGF5ZXJTdWJtYXJpbmUubGVuZ3RoLCA1LCA1LCAncGxheWVyJyk7XG5wbGF5ZXJTaGlwcy5zdWJtYXJpbmUueSA9IDU7XG5wbGF5ZXJTaGlwcy5zdWJtYXJpbmUueCA9IDU7XG5wbGF5ZXJTaGlwcy5zdWJtYXJpbmUuc2hpcCA9IHBsYXllclN1Ym1hcmluZTtcbmRpc3BsYXlTaGlwVmVydGljYWxseShwbGF5ZXJCb2FyZCwgcGxheWVyRGVzdHJveWVyLmxlbmd0aCwgMCwgOSwgJ3BsYXllcicpO1xucGxheWVyU2hpcHMuZGVzdHJveWVyLnkgPSAwO1xucGxheWVyU2hpcHMuZGVzdHJveWVyLnggPSA5O1xucGxheWVyU2hpcHMuZGVzdHJveWVyLnNoaXAgPSBwbGF5ZXJEZXN0cm95ZXI7XG5cbi8vT3Bwb25lbnRzIFNoaXAgcGxhY2VtZW50XG5kaXNwbGF5U2hpcEhvcml6b250YWxseShcbiAgb3Bwb25lbnRCb2FyZCxcbiAgb3Bwb25lbnRDYXJyaWVyLmxlbmd0aCxcbiAgMCxcbiAgMCxcbiAgJ29wcG9uZW50J1xuKTtcbm9wcG9uZW50U2hpcHMuY2Fycmllci55ID0gMDtcbm9wcG9uZW50U2hpcHMuY2Fycmllci54ID0gMDtcbm9wcG9uZW50U2hpcHMuY2Fycmllci5zaGlwID0gb3Bwb25lbnRDYXJyaWVyO1xuZGlzcGxheVNoaXBWZXJ0aWNhbGx5KFxuICBvcHBvbmVudEJvYXJkLFxuICBvcHBvbmVudEJhdHRsZXNoaXAubGVuZ3RoLFxuICAyLFxuICAyLFxuICAnb3Bwb25lbnQnXG4pO1xub3Bwb25lbnRTaGlwcy5iYXR0bGVzaGlwLnkgPSAyO1xub3Bwb25lbnRTaGlwcy5iYXR0bGVzaGlwLnggPSAyO1xub3Bwb25lbnRTaGlwcy5iYXR0bGVzaGlwLnNoaXAgPSBvcHBvbmVudEJhdHRsZXNoaXA7XG5kaXNwbGF5U2hpcEhvcml6b250YWxseShcbiAgb3Bwb25lbnRCb2FyZCxcbiAgb3Bwb25lbnRDcnVpc2VyLmxlbmd0aCxcbiAgOSxcbiAgMCxcbiAgJ29wcG9uZW50J1xuKTtcbm9wcG9uZW50U2hpcHMuY3J1aXNlci55ID0gOTtcbm9wcG9uZW50U2hpcHMuY3J1aXNlci54ID0gMDtcbm9wcG9uZW50U2hpcHMuY3J1aXNlci5zaGlwID0gb3Bwb25lbnRDcnVpc2VyO1xuZGlzcGxheVNoaXBIb3Jpem9udGFsbHkoXG4gIG9wcG9uZW50Qm9hcmQsXG4gIG9wcG9uZW50U3VibWFyaW5lLmxlbmd0aCxcbiAgNSxcbiAgNSxcbiAgJ29wcG9uZW50J1xuKTtcbm9wcG9uZW50U2hpcHMuc3VibWFyaW5lLnkgPSA1O1xub3Bwb25lbnRTaGlwcy5zdWJtYXJpbmUueCA9IDU7XG5vcHBvbmVudFNoaXBzLnN1Ym1hcmluZS5zaGlwID0gb3Bwb25lbnRTdWJtYXJpbmU7XG5kaXNwbGF5U2hpcFZlcnRpY2FsbHkoXG4gIG9wcG9uZW50Qm9hcmQsXG4gIG9wcG9uZW50RGVzdHJveWVyLmxlbmd0aCxcbiAgMCxcbiAgOSxcbiAgJ29wcG9uZW50J1xuKTtcbm9wcG9uZW50U2hpcHMuZGVzdHJveWVyLnkgPSAwO1xub3Bwb25lbnRTaGlwcy5kZXN0cm95ZXIueCA9IDk7XG5vcHBvbmVudFNoaXBzLmRlc3Ryb3llci5zaGlwID0gb3Bwb25lbnREZXN0cm95ZXI7XG5cbi8qYXR0YWNrU2hpcChwbGF5ZXJCb2FyZCwgcGxheWVyU2hpcHMuY2Fycmllci5zaGlwLCAwLCAwLCAncGxheWVyJyk7XG5hdHRhY2tTaGlwKHBsYXllckJvYXJkLCBwbGF5ZXJTaGlwcy5jYXJyaWVyLnNoaXAsIDAsIDQsICdwbGF5ZXInKTtcbmF0dGFja1NoaXAocGxheWVyQm9hcmQsIHBsYXllclNoaXBzLmNhcnJpZXIuc2hpcCwgNywgNywgJ3BsYXllcicpO1xuYXR0YWNrU2hpcChvcHBvbmVudEJvYXJkLCBvcHBvbmVudFNoaXBzLmNhcnJpZXIuc2hpcCwgNywgNywgJ29wcG9uZW50Jyk7XG5hdHRhY2tTaGlwKG9wcG9uZW50Qm9hcmQsIG9wcG9uZW50U2hpcHMuY2Fycmllci5zaGlwLCAyLCAyLCAnb3Bwb25lbnQnKTsqL1xuXG5vcHBvbmVudERpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGNoZWNrQ29ycmVjdFNoaXAoZSwgb3Bwb25lbnRTaGlwcywgb3Bwb25lbnRCb2FyZCwgJ29wcG9uZW50Jyk7XG4gIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50RWxlbWVudCk7XG59KTtcblxuY29uc29sZS5sb2cocGxheWVyQm9hcmQuZ2V0R2FtZWJvYXJkKCkpO1xuY29uc29sZS5sb2cob3Bwb25lbnRCb2FyZC5nZXRHYW1lYm9hcmQoKSk7XG5jb25zb2xlLmxvZyhvcHBvbmVudENhcnJpZXIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9