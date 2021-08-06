import { createGameboard } from './gameboard.js';
import { createShip } from './ships.js';

test('succesfully created gameboard', () => {
  const expected = ['', '', '', '', '', '', '', '', '', ''];
  const testGameboard = createGameboard();
  testGameboard.set();
  expect(testGameboard.getGameboard()).toEqual(
    expect.arrayContaining([expected])
  );
});

test('succesfully placed ship at specific cords horizontally', () => {
  const expected = ['', '', 'ship', 'ship', 'ship', 'ship', 'ship', '', '', ''];
  const testGameboard = createGameboard();
  testGameboard.set();
  const battleship = createShip(5);
  testGameboard.placeShipsHorizontally(battleship.length, 0, 2);
  expect(testGameboard.getGameboard()).toEqual(
    expect.arrayContaining([expected])
  );
});

test('succesfully placed ship at specific cords vertically', () => {
  const expected = ['', '', 'ship', '', '', '', '', '', '', ''];
  const testGameboard = createGameboard();
  testGameboard.set();
  const battleship = createShip(5);
  testGameboard.placeShipsVertically(battleship.length, 0, 2);
  expect(testGameboard.getGameboard()).toEqual(
    expect.arrayContaining([expected])
  );
});

test('succesfully received attack and hit', () => {
  const expected = ['', '', 'ship', 'hit', 'ship', 'ship', 'ship', '', '', ''];
  const testGameboard = createGameboard();
  testGameboard.set();
  const battleship = createShip(5);
  testGameboard.placeShipsHorizontally(battleship.length, 0, 2);
  testGameboard.receiveAttack(battleship, 0, 3);
  expect(testGameboard.getGameboard()).toEqual(
    expect.arrayContaining([expected])
  );
});

test('succesfully received attack and miss', () => {
  const expected = [
    'miss',
    '',
    'ship',
    'ship',
    'ship',
    'ship',
    'ship',
    '',
    '',
    '',
  ];
  const testGameboard = createGameboard();
  testGameboard.set();
  const battleship = createShip(5);
  testGameboard.placeShipsHorizontally(battleship.length, 0, 2);
  testGameboard.receiveAttack(battleship, 0, 0);
  expect(testGameboard.getGameboard()).toEqual(
    expect.arrayContaining([expected])
  );
});
