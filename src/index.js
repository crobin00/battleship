import { createGameboard } from './gameboard.js';
import { createShip } from './ships.js';
import {
  displayGameboards,
  displayShipHorizontally,
  displayShipVertically,
  attackShip,
  checkCorrectShip,
} from './dom.js';

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

//Player Ship placement
displayShipHorizontally(playerBoard, playerCarrier.length, 0, 0, 'player');
playerShips.carrier.y = 0;
playerShips.carrier.x = 0;
playerShips.carrier.ship = playerCarrier;
displayShipVertically(playerBoard, playerBattleship.length, 2, 2, 'player');
playerShips.battleship.y = 2;
playerShips.battleship.x = 2;
playerShips.battleship.ship = playerBattleship;
displayShipHorizontally(playerBoard, playerCruiser.length, 9, 0, 'player');
playerShips.cruiser.y = 9;
playerShips.cruiser.x = 0;
playerShips.cruiser.ship = playerCruiser;
displayShipHorizontally(playerBoard, playerSubmarine.length, 5, 5, 'player');
playerShips.submarine.y = 5;
playerShips.submarine.x = 5;
playerShips.submarine.ship = playerSubmarine;
displayShipVertically(playerBoard, playerDestroyer.length, 0, 9, 'player');
playerShips.destroyer.y = 0;
playerShips.destroyer.x = 9;
playerShips.destroyer.ship = playerDestroyer;

//Opponents Ship placement
displayShipHorizontally(
  opponentBoard,
  opponentCarrier.length,
  0,
  0,
  'opponent'
);
opponentShips.carrier.y = 0;
opponentShips.carrier.x = 0;
opponentShips.carrier.ship = opponentCarrier;
displayShipVertically(
  opponentBoard,
  opponentBattleship.length,
  2,
  2,
  'opponent'
);
opponentShips.battleship.y = 2;
opponentShips.battleship.x = 2;
opponentShips.battleship.ship = opponentBattleship;
displayShipHorizontally(
  opponentBoard,
  opponentCruiser.length,
  9,
  0,
  'opponent'
);
opponentShips.cruiser.y = 9;
opponentShips.cruiser.x = 0;
opponentShips.cruiser.ship = opponentCruiser;
displayShipHorizontally(
  opponentBoard,
  opponentSubmarine.length,
  5,
  5,
  'opponent'
);
opponentShips.submarine.y = 5;
opponentShips.submarine.x = 5;
opponentShips.submarine.ship = opponentSubmarine;
displayShipVertically(
  opponentBoard,
  opponentDestroyer.length,
  0,
  9,
  'opponent'
);
opponentShips.destroyer.y = 0;
opponentShips.destroyer.x = 9;
opponentShips.destroyer.ship = opponentDestroyer;

while (!gameOver) {
  if (playerTurn) {
    opponentDiv.addEventListener('click', (e) => {
      checkCorrectShip(e, opponentShips, opponentBoard, 'opponent');
      console.log(e.target);
      console.log(e.target.parentElement);
      playerTurn = false;
      opponentTurn = true;
    });
  }
  if (opponentTurn) {
    opponentAttack();
  }
}

console.log(playerBoard.getGameboard());
console.log(opponentBoard.getGameboard());
console.log(opponentCarrier);
