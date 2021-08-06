import { createShip } from './ships.js';

test('tests adding valid position', () => {
  const battleship = createShip(5);
  battleship.hit(4);
  expect(battleship.positionHit).toContain('hit');
});

test('tests adding position on length value', () => {
  const battleship = createShip(5);
  battleship.hit(5);
  expect(battleship.positionHit).not.toContain('hit');
});

test('tests filling every position in array', () => {
  const battleship = createShip(5);
  battleship.hit(0);
  battleship.hit(1);
  battleship.hit(2);
  battleship.hit(3);
  battleship.hit(4);
  expect(battleship.positionHit).toEqual(['hit', 'hit', 'hit', 'hit', 'hit']);
});

test('tests adding nothing when position is not valid', () => {
  const battleship = createShip(5);
  battleship.hit(7);
  expect(battleship.positionHit).not.toContain('hit');
});

test('test checking if ship is sunk', () => {
  const battleship = createShip(5);
  battleship.hit(0);
  battleship.hit(1);
  battleship.hit(2);
  battleship.hit(3);
  battleship.hit(4);
  expect(battleship.isSunk()).toBeTruthy();
});

test('test checking if ship is not sunk', () => {
  const battleship = createShip(5);
  battleship.hit(0);
  battleship.hit(1);
  expect(battleship.isSunk()).toBeFalsy();
});
