export { createShip };
import { createGameboard } from './gameboard.js';

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
