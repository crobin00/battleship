export { createGameboard };
import { createShip } from './ships.js';

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
