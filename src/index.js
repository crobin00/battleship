import { createGameboard } from './gameboard.js';
import { createShip } from './ships.js';
import {
  displayGameboards,
  displayShipHorizontally,
  displayShipVertically,
} from './dom.js';

let playerTurn = false;
let opponentTurn = false;
const playerCarrier = createShip(5);
const playerBattleship = createShip(4);
const playerCruiser = createShip(3);
const playerSubmarine = createShip(3);
const playerDestroyer = createShip(2);

const opponentCarrier = createShip(5);
const opponentBattleship = createShip(4);
const opponentCruiser = createShip(3);
const opponentSubmarine = createShip(3);
const opponentDestroyer = createShip(2);

const playerBoard = createGameboard();
playerBoard.set();
const opponentBoard = createGameboard();
opponentBoard.set();

displayGameboards();
displayShipHorizontally(playerBoard, playerCarrier.length, 0, 0, 'player');
displayShipHorizontally(playerBoard, playerBattleship.length, 1, 0, 'player');
displayShipHorizontally(playerBoard, playerCruiser.length, 2, 0, 'player');
displayShipHorizontally(playerBoard, playerSubmarine.length, 3, 0, 'player');
displayShipHorizontally(playerBoard, playerDestroyer.length, 4, 0, 'player');

displayShipVertically(opponentBoard, opponentCarrier.length, 3, 0, 'opponent');
displayShipVertically(
  opponentBoard,
  opponentBattleship.length,
  4,
  1,
  'opponent'
);
displayShipVertically(opponentBoard, opponentCruiser.length, 5, 2, 'opponent');
displayShipVertically(
  opponentBoard,
  opponentSubmarine.length,
  6,
  3,
  'opponent'
);
displayShipVertically(
  opponentBoard,
  opponentDestroyer.length,
  7,
  4,
  'opponent'
);

console.log(playerBoard.getGameboard());
console.log(opponentBoard.getGameboard());
