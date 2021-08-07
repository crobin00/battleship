export {
  displayGameboards,
  displayShipHorizontally,
  displayShipVertically,
  attackShip,
  checkCorrectShip,
};

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

opponentAttack() {
    const playerDiv = document.querySelector("#player-board");
}
