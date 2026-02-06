import { Player } from "./player";
import { Gameboard } from "./gameboard";
import { expect, test } from '@jest/globals';

test('Player has gameboard', () => {
    const player = new Player(new Gameboard());
    expect(player.gameboard).toBeInstanceOf(Gameboard);
});