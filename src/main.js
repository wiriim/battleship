import "./style.css";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
import { Player } from "./player";
import { initPlayerGameboard } from "./domController";

document.addEventListener('DOMContentLoaded', () => {
    const player1 = new Player(new Gameboard());
    const player2 = new Player(new Gameboard());
    initPlayerShip(player1, player2);
    initPlayerGameboard(player1, player2);
});

function initPlayerShip(player1, player2){
    // ships: 4 1tile, 3 2tile, 2 3tile, 1 4tile
    player1.gameboard.placeShip(new Ship([[1,0]]));
    player1.gameboard.placeShip(new Ship([[3,0]]));
    player1.gameboard.placeShip(new Ship([[4,9]]));
    player1.gameboard.placeShip(new Ship([[8,9]]));
    player1.gameboard.placeShip(new Ship([[1,7], [2,7]]));
    player1.gameboard.placeShip(new Ship([[1,9], [2,9]]));
    player1.gameboard.placeShip(new Ship([[8,3], [8,4]]));
    player1.gameboard.placeShip(new Ship([[2,2], [3,2], [4,2]]));
    player1.gameboard.placeShip(new Ship([[5,0], [6,0], [7,0]]));
    player1.gameboard.placeShip(new Ship([[4,4], [4,5], [4,6], [4,7]]));
    
    player2.gameboard.placeShip(new Ship([[1,0]]));
    player2.gameboard.placeShip(new Ship([[3,0]]));
    player2.gameboard.placeShip(new Ship([[4,9]]));
    player2.gameboard.placeShip(new Ship([[8,9]]));
    player2.gameboard.placeShip(new Ship([[1,7], [2,7]]));
    player2.gameboard.placeShip(new Ship([[1,9], [2,9]]));
    player2.gameboard.placeShip(new Ship([[8,3], [8,4]]));
    player2.gameboard.placeShip(new Ship([[2,2], [3,2], [4,2]]));
    player2.gameboard.placeShip(new Ship([[5,0], [6,0], [7,0]]));
    player2.gameboard.placeShip(new Ship([[4,4], [4,5], [4,6], [4,7]]));
}