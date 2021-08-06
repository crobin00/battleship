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
/* harmony export */   "attackShip": () => (/* binding */ attackShip)
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
      } else if (
        board.getGameboard()[i][j] === 'ship' &&
        selectBoardDiv == 'opponent'
      ) {
        const opponentDiv = document.querySelector('#opponent-board');
        const shipRowDiv = opponentDiv.querySelector(`[data-row='${i}']`);
        const shipDiv = shipRowDiv.querySelector(`[data-col='${j}']`);
        shipDiv.classList.add('ship');
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
      } else if (
        board.getGameboard()[i][j] === 'ship' &&
        selectBoardDiv == 'opponent'
      ) {
        const opponentDiv = document.querySelector('#opponent-board');
        const shipRowDiv = opponentDiv.querySelector(`[data-row='${i}']`);
        const shipDiv = shipRowDiv.querySelector(`[data-col='${j}']`);
        shipDiv.classList.add('ship');
      }
    }
  }
}

function attackShip(board, ship, yCord, xCord, selectBoardDiv) {
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
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipHorizontally)(playerBoard, playerCarrier.length, 0, 0, 'player');
playerShips.carrier.y = 0;
playerShips.carrier.x = 0;
playerShips.carrier.ship = playerCarrier;
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipHorizontally)(playerBoard, playerBattleship.length, 1, 0, 'player');
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipHorizontally)(playerBoard, playerCruiser.length, 2, 0, 'player');
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipHorizontally)(playerBoard, playerSubmarine.length, 3, 0, 'player');
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipHorizontally)(playerBoard, playerDestroyer.length, 4, 0, 'player');

(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipVertically)(opponentBoard, opponentCarrier.length, 3, 0, 'opponent');
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipVertically)(
  opponentBoard,
  opponentBattleship.length,
  4,
  1,
  'opponent'
);
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipVertically)(opponentBoard, opponentCruiser.length, 5, 2, 'opponent');
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipVertically)(
  opponentBoard,
  opponentSubmarine.length,
  6,
  3,
  'opponent'
);
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayShipVertically)(
  opponentBoard,
  opponentDestroyer.length,
  7,
  4,
  'opponent'
);

(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.attackShip)(playerBoard, playerShips.carrier.ship, 0, 0, 'player');
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.attackShip)(playerBoard, playerShips.carrier.ship, 0, 4, 'player');
(0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.attackShip)(playerBoard, playerShips.carrier.ship, 7, 7, 'player');

console.log(playerBoard.getGameboard());
console.log(opponentBoard.getGameboard());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsc0JBQXNCLHFEQUFVO0FBQ2hDLHlCQUF5QixxREFBVTtBQUNuQyxzQkFBc0IscURBQVU7QUFDaEMsd0JBQXdCLHFEQUFVO0FBQ2xDLHdCQUF3QixxREFBVTs7QUFFbEMsd0JBQXdCLHFEQUFVO0FBQ2xDLDJCQUEyQixxREFBVTtBQUNyQyx3QkFBd0IscURBQVU7QUFDbEMsMEJBQTBCLHFEQUFVO0FBQ3BDLDBCQUEwQixxREFBVTs7QUFFcEMsb0JBQW9CLDhEQUFlO0FBQ25DO0FBQ0Esc0JBQXNCLDhEQUFlO0FBQ3JDOztBQUVBLDBEQUFpQjtBQUNqQixnRUFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsZ0VBQXVCO0FBQ3ZCLGdFQUF1QjtBQUN2QixnRUFBdUI7QUFDdkIsZ0VBQXVCOztBQUV2Qiw4REFBcUI7QUFDckIsOERBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUFxQjtBQUNyQiw4REFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtREFBVTtBQUNWLG1EQUFVO0FBQ1YsbURBQVU7O0FBRVY7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHtcbiAgZGlzcGxheUdhbWVib2FyZHMsXG4gIGRpc3BsYXlTaGlwSG9yaXpvbnRhbGx5LFxuICBkaXNwbGF5U2hpcFZlcnRpY2FsbHksXG4gIGF0dGFja1NoaXAsXG59O1xuXG4vL0NyZWF0ZXMgMTB4MTAgZGl2IGVsZW1lbnRzXG5mdW5jdGlvbiBkaXNwbGF5R2FtZWJvYXJkcygpIHtcbiAgY29uc3QgcGxheWVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1ib2FyZCcpO1xuICBjb25zdCBvcHBvbmVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcHBvbmVudC1ib2FyZCcpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGNvbnN0IHJvd3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByb3dzLmNsYXNzTGlzdC5hZGQoJ3Jvd3MnKTtcbiAgICByb3dzLmRhdGFzZXQucm93ID0gaTtcbiAgICBwbGF5ZXJEaXYuYXBwZW5kQ2hpbGQocm93cyk7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBjb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb2xzLmNsYXNzTGlzdC5hZGQoJ2NvbHMnKTtcbiAgICAgIGNvbHMuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgcm93cy5hcHBlbmRDaGlsZChjb2xzKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCByb3dzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm93cy5jbGFzc0xpc3QuYWRkKCdyb3dzJyk7XG4gICAgcm93cy5kYXRhc2V0LnJvdyA9IGk7XG4gICAgb3Bwb25lbnREaXYuYXBwZW5kQ2hpbGQocm93cyk7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBjb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb2xzLmNsYXNzTGlzdC5hZGQoJ2NvbHMnKTtcbiAgICAgIGNvbHMuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgcm93cy5hcHBlbmRDaGlsZChjb2xzKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheVNoaXBIb3Jpem9udGFsbHkoXG4gIGJvYXJkLFxuICBzaGlwTGVuZ3RoLFxuICB5Q29yZCxcbiAgeENvcmQsXG4gIHNlbGVjdEJvYXJkRGl2XG4pIHtcbiAgYm9hcmQucGxhY2VTaGlwc0hvcml6b250YWxseShzaGlwTGVuZ3RoLCB5Q29yZCwgeENvcmQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgaWYgKGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnc2hpcCcgJiYgc2VsZWN0Qm9hcmREaXYgPT0gJ3BsYXllcicpIHtcbiAgICAgICAgY29uc3QgcGxheWVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1ib2FyZCcpO1xuICAgICAgICBjb25zdCBzaGlwUm93RGl2ID0gcGxheWVyRGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz0nJHtpfSddYCk7XG4gICAgICAgIGNvbnN0IHNoaXBEaXYgPSBzaGlwUm93RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvbD0nJHtqfSddYCk7XG4gICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09ICdzaGlwJyAmJlxuICAgICAgICBzZWxlY3RCb2FyZERpdiA9PSAnb3Bwb25lbnQnXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgb3Bwb25lbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3Bwb25lbnQtYm9hcmQnKTtcbiAgICAgICAgY29uc3Qgc2hpcFJvd0RpdiA9IG9wcG9uZW50RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz0nJHtpfSddYCk7XG4gICAgICAgIGNvbnN0IHNoaXBEaXYgPSBzaGlwUm93RGl2LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvbD0nJHtqfSddYCk7XG4gICAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5U2hpcFZlcnRpY2FsbHkoXG4gIGJvYXJkLFxuICBzaGlwTGVuZ3RoLFxuICB5Q29yZCxcbiAgeENvcmQsXG4gIHNlbGVjdEJvYXJkRGl2XG4pIHtcbiAgYm9hcmQucGxhY2VTaGlwc1ZlcnRpY2FsbHkoc2hpcExlbmd0aCwgeUNvcmQsIHhDb3JkKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGlmIChib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gJ3NoaXAnICYmIHNlbGVjdEJvYXJkRGl2ID09ICdwbGF5ZXInKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKTtcbiAgICAgICAgY29uc3Qgc2hpcFJvd0RpdiA9IHBsYXllckRpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnc2hpcCcgJiZcbiAgICAgICAgc2VsZWN0Qm9hcmREaXYgPT0gJ29wcG9uZW50J1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG9wcG9uZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wcG9uZW50LWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHNoaXBSb3dEaXYgPSBvcHBvbmVudERpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXR0YWNrU2hpcChib2FyZCwgc2hpcCwgeUNvcmQsIHhDb3JkLCBzZWxlY3RCb2FyZERpdikge1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKHNoaXAsIHlDb3JkLCB4Q29yZCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgaWYgKGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnaGl0JyAmJiBzZWxlY3RCb2FyZERpdiA9PSAncGxheWVyJykge1xuICAgICAgICBjb25zdCBwbGF5ZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHNoaXBSb3dEaXYgPSBwbGF5ZXJEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PScke2l9J11gKTtcbiAgICAgICAgY29uc3Qgc2hpcERpdiA9IHNoaXBSb3dEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtY29sPScke2p9J11gKTtcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gJ2hpdCcgJiZcbiAgICAgICAgc2VsZWN0Qm9hcmREaXYgPT0gJ29wcG9uZW50J1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG9wcG9uZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wcG9uZW50LWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHNoaXBSb3dEaXYgPSBvcHBvbmVudERpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcbiAgICAgIH1cbiAgICAgIGlmIChib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gJ21pc3MnICYmIHNlbGVjdEJvYXJkRGl2ID09ICdwbGF5ZXInKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKTtcbiAgICAgICAgY29uc3Qgc2hpcFJvd0RpdiA9IHBsYXllckRpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnbWlzcycgJiZcbiAgICAgICAgc2VsZWN0Qm9hcmREaXYgPT0gJ29wcG9uZW50J1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG9wcG9uZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wcG9uZW50LWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHNoaXBSb3dEaXYgPSBvcHBvbmVudERpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9O1xuaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gJy4vc2hpcHMuanMnO1xuXG5jb25zdCBjcmVhdGVHYW1lYm9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IFtdO1xuXG4gIC8vSW5pdGlhbGx5IGNyZWF0aW9uIG9mIDEweDEwIGdhbWVib2FyZCBhcnJheVxuICBjb25zdCBzZXQgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBnYW1lYm9hcmQucHVzaChbXSk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgZ2FtZWJvYXJkW2ldLnB1c2goJycpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXBzSG9yaXpvbnRhbGx5ID0gZnVuY3Rpb24gKHNoaXBMZW5ndGgsIHlDb3JkLCB4Q29yZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBnYW1lYm9hcmRbeUNvcmRdW3hDb3JkICsgaV0gPSAnc2hpcCc7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcHNWZXJ0aWNhbGx5ID0gZnVuY3Rpb24gKHNoaXBMZW5ndGgsIHlDb3JkLCB4Q29yZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBnYW1lYm9hcmRbeUNvcmQgKyBpXVt4Q29yZF0gPSAnc2hpcCc7XG4gICAgfVxuICB9O1xuXG4gIC8vUmVjZWl2ZXMgY29vcmRpbmF0ZXMgYW5kIGRldGVybWluZXMgd2hldGhlciB0aG9zZSBjb29yZHMgaGl0IGEgc2hpcCBvciBub3RcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uIChzaGlwLCB5Q29yZCwgeENvcmQpIHtcbiAgICBpZiAoZ2FtZWJvYXJkW3lDb3JkXVt4Q29yZF0gPT09ICdzaGlwJykge1xuICAgICAgZ2FtZWJvYXJkW3lDb3JkXVt4Q29yZF0gPSAnaGl0JztcbiAgICAgIHNoaXAuaGl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdhbWVib2FyZFt5Q29yZF1beENvcmRdID0gJ21pc3MnO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdhbWVib2FyZDtcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBzZXQsXG4gICAgcGxhY2VTaGlwc0hvcml6b250YWxseSxcbiAgICBwbGFjZVNoaXBzVmVydGljYWxseSxcbiAgICBnZXRHYW1lYm9hcmQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgfTtcbn07XG4iLCJleHBvcnQgeyBjcmVhdGVTaGlwIH07XG5pbXBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZC5qcyc7XG5cbmNvbnN0IGNyZWF0ZVNoaXAgPSBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gIGNvbnN0IHBvc2l0aW9uSGl0ID0gW107XG4gIGNvbnN0IGhpdCA9IChwb3NpdGlvbiA9IHVuZGVmaW5lZCkgPT4ge1xuICAgIGlmIChwb3NpdGlvbiA+IGxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zaXRpb25IaXQucHVzaCgnaGl0Jyk7XG4gICAgfVxuICB9O1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYgKHBvc2l0aW9uSGl0Lmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb25IaXQubGVuZ3RoID09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9O1xuICByZXR1cm4geyBwb3NpdGlvbkhpdCwgaGl0LCBpc1N1bmssIGxlbmd0aCB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQuanMnO1xuaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gJy4vc2hpcHMuanMnO1xuaW1wb3J0IHtcbiAgZGlzcGxheUdhbWVib2FyZHMsXG4gIGRpc3BsYXlTaGlwSG9yaXpvbnRhbGx5LFxuICBkaXNwbGF5U2hpcFZlcnRpY2FsbHksXG4gIGF0dGFja1NoaXAsXG59IGZyb20gJy4vZG9tLmpzJztcblxubGV0IHBsYXllclR1cm4gPSBmYWxzZTtcbmxldCBvcHBvbmVudFR1cm4gPSBmYWxzZTtcblxubGV0IHBsYXllclNoaXBzID0ge1xuICBjYXJyaWVyOiB7XG4gICAgeTogbnVsbCxcbiAgICB4OiBudWxsLFxuICAgIHNoaXA6IG51bGwsXG4gIH0sXG4gIGJhdHRsZXNoaXA6IHtcbiAgICB5OiBudWxsLFxuICAgIHg6IG51bGwsXG4gICAgc2hpcDogbnVsbCxcbiAgfSxcbiAgY3J1aXNlcjoge1xuICAgIHk6IG51bGwsXG4gICAgeDogbnVsbCxcbiAgICBzaGlwOiBudWxsLFxuICB9LFxuICBzdWJtYXJpbmU6IHtcbiAgICB5OiBudWxsLFxuICAgIHg6IG51bGwsXG4gICAgc2hpcDogbnVsbCxcbiAgfSxcbiAgZGVzdHJveWVyOiB7XG4gICAgeTogbnVsbCxcbiAgICB4OiBudWxsLFxuICAgIHNoaXA6IG51bGwsXG4gIH0sXG59O1xuXG5jb25zdCBwbGF5ZXJDYXJyaWVyID0gY3JlYXRlU2hpcCg1KTtcbmNvbnN0IHBsYXllckJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKDQpO1xuY29uc3QgcGxheWVyQ3J1aXNlciA9IGNyZWF0ZVNoaXAoMyk7XG5jb25zdCBwbGF5ZXJTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKDMpO1xuY29uc3QgcGxheWVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgyKTtcblxuY29uc3Qgb3Bwb25lbnRDYXJyaWVyID0gY3JlYXRlU2hpcCg1KTtcbmNvbnN0IG9wcG9uZW50QmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoNCk7XG5jb25zdCBvcHBvbmVudENydWlzZXIgPSBjcmVhdGVTaGlwKDMpO1xuY29uc3Qgb3Bwb25lbnRTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKDMpO1xuY29uc3Qgb3Bwb25lbnREZXN0cm95ZXIgPSBjcmVhdGVTaGlwKDIpO1xuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xucGxheWVyQm9hcmQuc2V0KCk7XG5jb25zdCBvcHBvbmVudEJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG5vcHBvbmVudEJvYXJkLnNldCgpO1xuXG5kaXNwbGF5R2FtZWJvYXJkcygpO1xuZGlzcGxheVNoaXBIb3Jpem9udGFsbHkocGxheWVyQm9hcmQsIHBsYXllckNhcnJpZXIubGVuZ3RoLCAwLCAwLCAncGxheWVyJyk7XG5wbGF5ZXJTaGlwcy5jYXJyaWVyLnkgPSAwO1xucGxheWVyU2hpcHMuY2Fycmllci54ID0gMDtcbnBsYXllclNoaXBzLmNhcnJpZXIuc2hpcCA9IHBsYXllckNhcnJpZXI7XG5kaXNwbGF5U2hpcEhvcml6b250YWxseShwbGF5ZXJCb2FyZCwgcGxheWVyQmF0dGxlc2hpcC5sZW5ndGgsIDEsIDAsICdwbGF5ZXInKTtcbmRpc3BsYXlTaGlwSG9yaXpvbnRhbGx5KHBsYXllckJvYXJkLCBwbGF5ZXJDcnVpc2VyLmxlbmd0aCwgMiwgMCwgJ3BsYXllcicpO1xuZGlzcGxheVNoaXBIb3Jpem9udGFsbHkocGxheWVyQm9hcmQsIHBsYXllclN1Ym1hcmluZS5sZW5ndGgsIDMsIDAsICdwbGF5ZXInKTtcbmRpc3BsYXlTaGlwSG9yaXpvbnRhbGx5KHBsYXllckJvYXJkLCBwbGF5ZXJEZXN0cm95ZXIubGVuZ3RoLCA0LCAwLCAncGxheWVyJyk7XG5cbmRpc3BsYXlTaGlwVmVydGljYWxseShvcHBvbmVudEJvYXJkLCBvcHBvbmVudENhcnJpZXIubGVuZ3RoLCAzLCAwLCAnb3Bwb25lbnQnKTtcbmRpc3BsYXlTaGlwVmVydGljYWxseShcbiAgb3Bwb25lbnRCb2FyZCxcbiAgb3Bwb25lbnRCYXR0bGVzaGlwLmxlbmd0aCxcbiAgNCxcbiAgMSxcbiAgJ29wcG9uZW50J1xuKTtcbmRpc3BsYXlTaGlwVmVydGljYWxseShvcHBvbmVudEJvYXJkLCBvcHBvbmVudENydWlzZXIubGVuZ3RoLCA1LCAyLCAnb3Bwb25lbnQnKTtcbmRpc3BsYXlTaGlwVmVydGljYWxseShcbiAgb3Bwb25lbnRCb2FyZCxcbiAgb3Bwb25lbnRTdWJtYXJpbmUubGVuZ3RoLFxuICA2LFxuICAzLFxuICAnb3Bwb25lbnQnXG4pO1xuZGlzcGxheVNoaXBWZXJ0aWNhbGx5KFxuICBvcHBvbmVudEJvYXJkLFxuICBvcHBvbmVudERlc3Ryb3llci5sZW5ndGgsXG4gIDcsXG4gIDQsXG4gICdvcHBvbmVudCdcbik7XG5cbmF0dGFja1NoaXAocGxheWVyQm9hcmQsIHBsYXllclNoaXBzLmNhcnJpZXIuc2hpcCwgMCwgMCwgJ3BsYXllcicpO1xuYXR0YWNrU2hpcChwbGF5ZXJCb2FyZCwgcGxheWVyU2hpcHMuY2Fycmllci5zaGlwLCAwLCA0LCAncGxheWVyJyk7XG5hdHRhY2tTaGlwKHBsYXllckJvYXJkLCBwbGF5ZXJTaGlwcy5jYXJyaWVyLnNoaXAsIDcsIDcsICdwbGF5ZXInKTtcblxuY29uc29sZS5sb2cocGxheWVyQm9hcmQuZ2V0R2FtZWJvYXJkKCkpO1xuY29uc29sZS5sb2cob3Bwb25lbnRCb2FyZC5nZXRHYW1lYm9hcmQoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=