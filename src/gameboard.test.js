import { Gameboard } from './gameboard';
import { Ship } from './ship';
import { expect, test } from '@jest/globals';

const gameboard = new Gameboard();
const board = gameboard.board;

test('Board length is 10', () => {
    expect(gameboard.length).toBe(10);
});

test('Board height is 10', () => {
    expect(gameboard.height).toBe(10);
});

const ship = new Ship([[0, 2], [0,3]]);
gameboard.placeShip(ship);

test('Board at 0,2 has ship placed', () => {
    expect(board[0][2]).toBe(ship);
});

test('Board at 0,3 has ship placed', () => {
    expect(board[0][2]).toBe(ship);
});

test('Ship at 0,2 & 0,3 has been hit once', () => {
    gameboard.receiveAttack(0,2);
    expect(board[0][2].timesHit).toBe(1);
});

test('Gameboard is attacked once', () => {
    expect(gameboard.attacked.length).toBe(1);
});

test('Ship at 0,2 & 0,3 has been sunk', () => {
    gameboard.receiveAttack(0,3);
    expect(board[0][3].isSunk).toBe(true);
});

test('Gameboard is game over', () => {
    expect(gameboard.gameOver).toBe(true);
});

test('Surrounding ship tiles in gameboard marked as hit', () => {
    function includes(arr, coor){
        for(let e of arr){
            if (e.every((x, i) => x == coor[i])) return true;
        }
        return false;
    }

    expect(includes(gameboard.attacked, [0,1])).toBe(true);
    expect(includes(gameboard.attacked, [1,2])).toBe(true);
    expect(includes(gameboard.attacked, [1,3])).toBe(true);
    expect(includes(gameboard.attacked, [0,4])).toBe(true);
});