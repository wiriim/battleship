import { Ship } from "./ship";
import { expect, test } from '@jest/globals';

const ship = new Ship([[1,2], [1,3]]);

test('Ship is 2 blocks long', () => {
    expect(ship.length).toBe(2);
});

test('Ship is hit', () => {
    ship.hit();
    expect(ship.timesHit).toBe(1);
});

test('Ship is sunk', () => {
    ship.sunk();
    expect(ship.isSunk).toBe(true);
});