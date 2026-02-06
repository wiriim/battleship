import "./style.css";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
import { Player } from "./player";
import { initPlayerGameboard, updatePlayer1Gameboard, updatePlayer2Gameboard } from "./domController";

document.addEventListener('DOMContentLoaded', () => {
    const player1 = new Player(new Gameboard());
    const player2 = new Player(new Gameboard());
    initPlayerShip(player1, player2);
    initPlayerGameboard(player1, player2);
    addTileListener(player1, player2);
    addComputerListener(player1);
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

function addTileListener(player1, player2){
    const player1Gameboard = player1.gameboard;
    const player1Tile = document.querySelectorAll('.player1-tile');
    for (let tile of player1Tile){
        tile.addEventListener('click', (e) => {
            if (!player1Gameboard.gameOver && !player2Gameboard.gameOver){
                const coor1 = e.target.dataset.coor1;
                const coor2 = e.target.dataset.coor2;
                if (!includes(player1Gameboard.attacked, [coor1, coor2])){
                    player1Gameboard.receiveAttack(coor1, coor2);
                    updatePlayer1Gameboard(player1);
                    updatePlayerTurn(0);
    
                    if (player1Gameboard.gameOver) alert('P2 WIN');
                }
                else{
                    alert('ALREADY HIT');
                }
            }
        });
    }

    const player2Gameboard = player2.gameboard;
    const player2Tile = document.querySelectorAll('.player2-tile');
    for (let tile of player2Tile){
        tile.addEventListener('click', (e) => {
            if (!player1Gameboard.gameOver && !player2Gameboard.gameOver){
                const coor1 = e.target.dataset.coor1;
                const coor2 = e.target.dataset.coor2;
                if (!includes(player2Gameboard.attacked, [coor1, coor2])){
                    player2Gameboard.receiveAttack(coor1, coor2);
                    updatePlayer2Gameboard(player2);
                    updatePlayerTurn(1);
    
                    if (player2Gameboard.gameOver) alert('P1 WIN');
                }
                else{
                    alert('ALREADY HIT');
                }
            }
        });
    }
    
}

function addComputerListener(player1){
    const select = document.querySelector('#player-turn');
    const player1Gameboard = player1.gameboard;
    const player2Tile = document.querySelectorAll('.player2-tile');
    for (let tile of player2Tile){
        tile.addEventListener('click', () => {
            if (select.selectedIndex == 1){
                let randCoor1;
                let randCoor2;
                do {
                    randCoor1 = Math.floor(Math.random() * 10);
                    randCoor2 = Math.floor(Math.random() * 10);
                } while (includes(player1Gameboard.attacked, [randCoor1, randCoor2]));
                
                player1Gameboard.receiveAttack(randCoor1, randCoor2);
                updatePlayer1Gameboard(player1);
                updatePlayerTurn(0);

                if (player1Gameboard.gameOver) alert('P2 WIN');
            }
        });
    }
}

function updatePlayerTurn(selectedIndex){
    const select = document.querySelector('#player-turn');
    select.selectedIndex = selectedIndex;
}

export function includes(arr, coor){
    for(let e of arr){
        if (e.every((x, i) => x == coor[i])) return true;
    }
    return false;
}