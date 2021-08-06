export {
  displayGameboards,
  displayShipHorizontally,
  displayShipVertically,
  attackShip,
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
