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
/* harmony export */   "displayShipVertically": () => (/* binding */ displayShipVertically)
/* harmony export */ });


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

console.log(playerBoard.getGameboard());
console.log(opponentBoard.getGameboard());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTZFOztBQUU3RTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixRQUFRO0FBQzFCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSxpRUFBaUUsRUFBRTtBQUNuRSwrREFBK0QsRUFBRTtBQUNqRTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxFQUFFO0FBQ3JFLCtEQUErRCxFQUFFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsUUFBUTtBQUMxQixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EsaUVBQWlFLEVBQUU7QUFDbkUsK0RBQStELEVBQUU7QUFDakU7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsRUFBRTtBQUNyRSwrREFBK0QsRUFBRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekYyQjtBQUNhOztBQUV4QztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdDc0I7QUFDMkI7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7Ozs7OztVQ3BCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOaUQ7QUFDVDtBQUt0Qjs7QUFFbEI7QUFDQTtBQUNBLHNCQUFzQixxREFBVTtBQUNoQyx5QkFBeUIscURBQVU7QUFDbkMsc0JBQXNCLHFEQUFVO0FBQ2hDLHdCQUF3QixxREFBVTtBQUNsQyx3QkFBd0IscURBQVU7O0FBRWxDLHdCQUF3QixxREFBVTtBQUNsQywyQkFBMkIscURBQVU7QUFDckMsd0JBQXdCLHFEQUFVO0FBQ2xDLDBCQUEwQixxREFBVTtBQUNwQywwQkFBMEIscURBQVU7O0FBRXBDLG9CQUFvQiw4REFBZTtBQUNuQztBQUNBLHNCQUFzQiw4REFBZTtBQUNyQzs7QUFFQSwwREFBaUI7QUFDakIsZ0VBQXVCO0FBQ3ZCLGdFQUF1QjtBQUN2QixnRUFBdUI7QUFDdkIsZ0VBQXVCO0FBQ3ZCLGdFQUF1Qjs7QUFFdkIsOERBQXFCO0FBQ3JCLDhEQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBcUI7QUFDckIsOERBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHsgZGlzcGxheUdhbWVib2FyZHMsIGRpc3BsYXlTaGlwSG9yaXpvbnRhbGx5LCBkaXNwbGF5U2hpcFZlcnRpY2FsbHkgfTtcblxuZnVuY3Rpb24gZGlzcGxheUdhbWVib2FyZHMoKSB7XG4gIGNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKTtcbiAgY29uc3Qgb3Bwb25lbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3Bwb25lbnQtYm9hcmQnKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCByb3dzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm93cy5jbGFzc0xpc3QuYWRkKCdyb3dzJyk7XG4gICAgcm93cy5kYXRhc2V0LnJvdyA9IGk7XG4gICAgcGxheWVyRGl2LmFwcGVuZENoaWxkKHJvd3MpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3QgY29scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29scy5jbGFzc0xpc3QuYWRkKCdjb2xzJyk7XG4gICAgICBjb2xzLmRhdGFzZXQuY29sID0gajtcbiAgICAgIHJvd3MuYXBwZW5kQ2hpbGQoY29scyk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgY29uc3Qgcm93cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJvd3MuY2xhc3NMaXN0LmFkZCgncm93cycpO1xuICAgIHJvd3MuZGF0YXNldC5yb3cgPSBpO1xuICAgIG9wcG9uZW50RGl2LmFwcGVuZENoaWxkKHJvd3MpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3QgY29scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29scy5jbGFzc0xpc3QuYWRkKCdjb2xzJyk7XG4gICAgICBjb2xzLmRhdGFzZXQuY29sID0gajtcbiAgICAgIHJvd3MuYXBwZW5kQ2hpbGQoY29scyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTaGlwSG9yaXpvbnRhbGx5KFxuICBib2FyZCxcbiAgc2hpcExlbmd0aCxcbiAgeUNvcmQsXG4gIHhDb3JkLFxuICBzZWxlY3RCb2FyZERpdlxuKSB7XG4gIGJvYXJkLnBsYWNlU2hpcHNIb3Jpem9udGFsbHkoc2hpcExlbmd0aCwgeUNvcmQsIHhDb3JkKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGlmIChib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gJ3NoaXAnICYmIHNlbGVjdEJvYXJkRGl2ID09ICdwbGF5ZXInKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKTtcbiAgICAgICAgY29uc3Qgc2hpcFJvd0RpdiA9IHBsYXllckRpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSAnc2hpcCcgJiZcbiAgICAgICAgc2VsZWN0Qm9hcmREaXYgPT0gJ29wcG9uZW50J1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG9wcG9uZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wcG9uZW50LWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHNoaXBSb3dEaXYgPSBvcHBvbmVudERpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7aX0nXWApO1xuICAgICAgICBjb25zdCBzaGlwRGl2ID0gc2hpcFJvd0Rpdi5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb2w9JyR7an0nXWApO1xuICAgICAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheVNoaXBWZXJ0aWNhbGx5KFxuICBib2FyZCxcbiAgc2hpcExlbmd0aCxcbiAgeUNvcmQsXG4gIHhDb3JkLFxuICBzZWxlY3RCb2FyZERpdlxuKSB7XG4gIGJvYXJkLnBsYWNlU2hpcHNWZXJ0aWNhbGx5KHNoaXBMZW5ndGgsIHlDb3JkLCB4Q29yZCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBpZiAoYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09ICdzaGlwJyAmJiBzZWxlY3RCb2FyZERpdiA9PSAncGxheWVyJykge1xuICAgICAgICBjb25zdCBwbGF5ZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHNoaXBSb3dEaXYgPSBwbGF5ZXJEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PScke2l9J11gKTtcbiAgICAgICAgY29uc3Qgc2hpcERpdiA9IHNoaXBSb3dEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtY29sPScke2p9J11gKTtcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gJ3NoaXAnICYmXG4gICAgICAgIHNlbGVjdEJvYXJkRGl2ID09ICdvcHBvbmVudCdcbiAgICAgICkge1xuICAgICAgICBjb25zdCBvcHBvbmVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcHBvbmVudC1ib2FyZCcpO1xuICAgICAgICBjb25zdCBzaGlwUm93RGl2ID0gb3Bwb25lbnREaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PScke2l9J11gKTtcbiAgICAgICAgY29uc3Qgc2hpcERpdiA9IHNoaXBSb3dEaXYucXVlcnlTZWxlY3RvcihgW2RhdGEtY29sPScke2p9J11gKTtcbiAgICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfTtcbmltcG9ydCB7IGNyZWF0ZVNoaXAgfSBmcm9tICcuL3NoaXBzLmpzJztcblxuY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBnYW1lYm9hcmQgPSBbXTtcbiAgY29uc3Qgc2V0ID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZ2FtZWJvYXJkLnB1c2goW10pO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGdhbWVib2FyZFtpXS5wdXNoKCcnKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwc0hvcml6b250YWxseSA9IGZ1bmN0aW9uIChzaGlwTGVuZ3RoLCB5Q29yZCwgeENvcmQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgZ2FtZWJvYXJkW3lDb3JkXVt4Q29yZCArIGldID0gJ3NoaXAnO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXBzVmVydGljYWxseSA9IGZ1bmN0aW9uIChzaGlwTGVuZ3RoLCB5Q29yZCwgeENvcmQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgZ2FtZWJvYXJkW3lDb3JkICsgaV1beENvcmRdID0gJ3NoaXAnO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24gKHNoaXAsIHlDb3JkLCB4Q29yZCkge1xuICAgIGlmIChnYW1lYm9hcmRbeUNvcmRdW3hDb3JkXSA9PT0gJ3NoaXAnKSB7XG4gICAgICBnYW1lYm9hcmRbeUNvcmRdW3hDb3JkXSA9ICdoaXQnO1xuICAgICAgc2hpcC5oaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FtZWJvYXJkW3lDb3JkXVt4Q29yZF0gPSAnbWlzcyc7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEdhbWVib2FyZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2FtZWJvYXJkO1xuICB9O1xuICByZXR1cm4ge1xuICAgIHNldCxcbiAgICBwbGFjZVNoaXBzSG9yaXpvbnRhbGx5LFxuICAgIHBsYWNlU2hpcHNWZXJ0aWNhbGx5LFxuICAgIGdldEdhbWVib2FyZCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICB9O1xufTtcbiIsImV4cG9ydCB7IGNyZWF0ZVNoaXAgfTtcbmltcG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkLmpzJztcblxuY29uc3QgY3JlYXRlU2hpcCA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgY29uc3QgcG9zaXRpb25IaXQgPSBbXTtcbiAgY29uc3QgaGl0ID0gKHBvc2l0aW9uID0gdW5kZWZpbmVkKSA9PiB7XG4gICAgaWYgKHBvc2l0aW9uID4gbGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3NpdGlvbkhpdC5wdXNoKCdoaXQnKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZiAocG9zaXRpb25IaXQubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbkhpdC5sZW5ndGggPT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB7IHBvc2l0aW9uSGl0LCBoaXQsIGlzU3VuaywgbGVuZ3RoIH07XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZC5qcyc7XG5pbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSAnLi9zaGlwcy5qcyc7XG5pbXBvcnQge1xuICBkaXNwbGF5R2FtZWJvYXJkcyxcbiAgZGlzcGxheVNoaXBIb3Jpem9udGFsbHksXG4gIGRpc3BsYXlTaGlwVmVydGljYWxseSxcbn0gZnJvbSAnLi9kb20uanMnO1xuXG5sZXQgcGxheWVyVHVybiA9IGZhbHNlO1xubGV0IG9wcG9uZW50VHVybiA9IGZhbHNlO1xuY29uc3QgcGxheWVyQ2FycmllciA9IGNyZWF0ZVNoaXAoNSk7XG5jb25zdCBwbGF5ZXJCYXR0bGVzaGlwID0gY3JlYXRlU2hpcCg0KTtcbmNvbnN0IHBsYXllckNydWlzZXIgPSBjcmVhdGVTaGlwKDMpO1xuY29uc3QgcGxheWVyU3VibWFyaW5lID0gY3JlYXRlU2hpcCgzKTtcbmNvbnN0IHBsYXllckRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoMik7XG5cbmNvbnN0IG9wcG9uZW50Q2FycmllciA9IGNyZWF0ZVNoaXAoNSk7XG5jb25zdCBvcHBvbmVudEJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKDQpO1xuY29uc3Qgb3Bwb25lbnRDcnVpc2VyID0gY3JlYXRlU2hpcCgzKTtcbmNvbnN0IG9wcG9uZW50U3VibWFyaW5lID0gY3JlYXRlU2hpcCgzKTtcbmNvbnN0IG9wcG9uZW50RGVzdHJveWVyID0gY3JlYXRlU2hpcCgyKTtcblxuY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVHYW1lYm9hcmQoKTtcbnBsYXllckJvYXJkLnNldCgpO1xuY29uc3Qgb3Bwb25lbnRCb2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xub3Bwb25lbnRCb2FyZC5zZXQoKTtcblxuZGlzcGxheUdhbWVib2FyZHMoKTtcbmRpc3BsYXlTaGlwSG9yaXpvbnRhbGx5KHBsYXllckJvYXJkLCBwbGF5ZXJDYXJyaWVyLmxlbmd0aCwgMCwgMCwgJ3BsYXllcicpO1xuZGlzcGxheVNoaXBIb3Jpem9udGFsbHkocGxheWVyQm9hcmQsIHBsYXllckJhdHRsZXNoaXAubGVuZ3RoLCAxLCAwLCAncGxheWVyJyk7XG5kaXNwbGF5U2hpcEhvcml6b250YWxseShwbGF5ZXJCb2FyZCwgcGxheWVyQ3J1aXNlci5sZW5ndGgsIDIsIDAsICdwbGF5ZXInKTtcbmRpc3BsYXlTaGlwSG9yaXpvbnRhbGx5KHBsYXllckJvYXJkLCBwbGF5ZXJTdWJtYXJpbmUubGVuZ3RoLCAzLCAwLCAncGxheWVyJyk7XG5kaXNwbGF5U2hpcEhvcml6b250YWxseShwbGF5ZXJCb2FyZCwgcGxheWVyRGVzdHJveWVyLmxlbmd0aCwgNCwgMCwgJ3BsYXllcicpO1xuXG5kaXNwbGF5U2hpcFZlcnRpY2FsbHkob3Bwb25lbnRCb2FyZCwgb3Bwb25lbnRDYXJyaWVyLmxlbmd0aCwgMywgMCwgJ29wcG9uZW50Jyk7XG5kaXNwbGF5U2hpcFZlcnRpY2FsbHkoXG4gIG9wcG9uZW50Qm9hcmQsXG4gIG9wcG9uZW50QmF0dGxlc2hpcC5sZW5ndGgsXG4gIDQsXG4gIDEsXG4gICdvcHBvbmVudCdcbik7XG5kaXNwbGF5U2hpcFZlcnRpY2FsbHkob3Bwb25lbnRCb2FyZCwgb3Bwb25lbnRDcnVpc2VyLmxlbmd0aCwgNSwgMiwgJ29wcG9uZW50Jyk7XG5kaXNwbGF5U2hpcFZlcnRpY2FsbHkoXG4gIG9wcG9uZW50Qm9hcmQsXG4gIG9wcG9uZW50U3VibWFyaW5lLmxlbmd0aCxcbiAgNixcbiAgMyxcbiAgJ29wcG9uZW50J1xuKTtcbmRpc3BsYXlTaGlwVmVydGljYWxseShcbiAgb3Bwb25lbnRCb2FyZCxcbiAgb3Bwb25lbnREZXN0cm95ZXIubGVuZ3RoLFxuICA3LFxuICA0LFxuICAnb3Bwb25lbnQnXG4pO1xuXG5jb25zb2xlLmxvZyhwbGF5ZXJCb2FyZC5nZXRHYW1lYm9hcmQoKSk7XG5jb25zb2xlLmxvZyhvcHBvbmVudEJvYXJkLmdldEdhbWVib2FyZCgpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==