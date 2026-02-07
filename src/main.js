import "./style.css";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
import { Player } from "./player";
import { initPlayerGameboard, updatePlayer1Gameboard, updatePlayer2Gameboard, updateShipTiles } from "./domController";

document.addEventListener('DOMContentLoaded', () => {
    const player1 = new Player(new Gameboard());
    const player2 = new Player(new Gameboard());
    initPlayerShip(player1, player2);
    initPlayerGameboard(player1, player2);
    addTileListener(player1, player2);
    addComputerListener(player1);
    addDragAndDropListener(player1);
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
    
    let randCoor1;
    let randCoor2;
    for (let i = 0; i < 1; i++){
        do {
            randCoor1 = Math.floor(Math.random() * 10);
            randCoor2 = Math.floor(Math.random() * 10);
        } while (randCoor2+1 >= player2.gameboard.length || randCoor2+2 >= player2.gameboard.length || randCoor2+3 >= player2.gameboard.length 
            || !isValidPlacement(player2, [[randCoor1, randCoor2], [randCoor1, randCoor2+1], [randCoor1, randCoor2+2], [randCoor1, randCoor2+3]])
        );
        player2.gameboard.placeShip(new Ship([[randCoor1, randCoor2], [randCoor1, randCoor2+1], [randCoor1, randCoor2+2], [randCoor1, randCoor2+3]]));
    }

    for (let i = 0; i < 2; i++){
        do {
            randCoor1 = Math.floor(Math.random() * 10);
            randCoor2 = Math.floor(Math.random() * 10);
        } while (randCoor2+1 >= player2.gameboard.length || randCoor2+2 >= player2.gameboard.length 
            || !isValidPlacement(player2, [[randCoor1, randCoor2], [randCoor1, randCoor2+1], [randCoor1, randCoor2+2]])
        );
        player2.gameboard.placeShip(new Ship([[randCoor1, randCoor2], [randCoor1, randCoor2+1], [randCoor1, randCoor2+2]]));
    }

    for (let i = 0; i < 3; i++){
        do {
            randCoor1 = Math.floor(Math.random() * 10);
            randCoor2 = Math.floor(Math.random() * 10);
        } while (randCoor2+1 >= player2.gameboard.length
            || !isValidPlacement(player2, [[randCoor1, randCoor2], [randCoor1, randCoor2+1]])
        );
        player2.gameboard.placeShip(new Ship([[randCoor1, randCoor2], [randCoor1, randCoor2+1]]));
    }

    for (let i = 0; i < 4; i++){
        do {
            randCoor1 = Math.floor(Math.random() * 10);
            randCoor2 = Math.floor(Math.random() * 10);
        } while (!isValidPlacement(player2, [[randCoor1, randCoor2]]));
        player2.gameboard.placeShip(new Ship([[randCoor1, randCoor2]]));
    }
}

function isValidPlacement(player, arr){
    // 0,-1
    // -1,-1 
    // +1,-1
    // +1,0
    // -1,0
    // 0,+1
    // +1,+1
    // -1,+1 
    const gameboard = player.gameboard;
    const board = player.gameboard.board;
    for (let coor of arr){
        const coor1 = coor[0];
        const coor2 = coor[1];
        if (isInstanceOfShip(board[coor1][coor2])) return false;
        if (gameboard.isInboundLength(coor2-1) && !includes(arr, board[coor1][coor2-1]) && isInstanceOfShip(board[coor1][coor2-1]))
            return false;
        if (gameboard.isInboundHeight(coor1-1) && gameboard.isInboundLength(coor2-1) && !includes(arr, board[coor1-1][coor2-1]) && isInstanceOfShip(board[coor1-1][coor2-1]))
            return false;
        if (gameboard.isInboundHeight(coor1+1) && gameboard.isInboundLength(coor2-1) && !includes(arr, board[coor1+1][coor2-1]) && isInstanceOfShip(board[coor1+1][coor2-1]))
            return false;
        if (gameboard.isInboundHeight(coor1+1) && !includes(arr, board[coor1+1][coor2]) && isInstanceOfShip(board[coor1+1][coor2]))
            return false;
        if (gameboard.isInboundHeight(coor1-1) && !includes(arr, board[coor1-1][coor2]) && isInstanceOfShip(board[coor1-1][coor2]))
            return false;
        if (gameboard.isInboundLength(coor2+1) && !includes(arr, board[coor1][coor2+1]) && isInstanceOfShip(board[coor1][coor2+1]))
            return false;
        if (gameboard.isInboundHeight(coor1+1) && gameboard.isInboundLength(coor2+1) && !includes(arr, board[coor1+1][coor2+1]) && isInstanceOfShip(board[coor1+1][coor2+1]))
            return false;
        if (gameboard.isInboundHeight(coor1-1) && gameboard.isInboundLength(coor2+1) && !includes(arr, board[coor1-1][coor2+1]) && isInstanceOfShip(board[coor1-1][coor2+1]))
            return false;
    }
    return true;
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

                    if (!isInstanceOfShip(player1Gameboard.board[coor1][coor2]))
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

                    if (!isInstanceOfShip(player2Gameboard.board[coor1][coor2]))
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
            let randCoor1;
            let randCoor2;
            if (select.selectedIndex == 1){
                do {
                    do {
                        randCoor1 = Math.floor(Math.random() * 10);
                        randCoor2 = Math.floor(Math.random() * 10);
                    } while (includes(player1Gameboard.attacked, [randCoor1, randCoor2]));
                    
                    player1Gameboard.receiveAttack(randCoor1, randCoor2);
                    updatePlayer1Gameboard(player1);
    
                    if (!isInstanceOfShip(player1Gameboard.board[randCoor1][randCoor2]))
                        updatePlayerTurn(0);
    
                    if (player1Gameboard.gameOver) alert('P2 WIN');
                } while (isInstanceOfShip(player1Gameboard.board[randCoor1][randCoor2]));
            }
        });
    }
}

function updatePlayerTurn(selectedIndex){
    const select = document.querySelector('#player-turn');
    select.selectedIndex = selectedIndex;
}

function addDragAndDropListener(player){
    const player1Tile = document.querySelectorAll('.player1-tile');
    const playerBoard = player.gameboard.board;
    let coor1, coor2;
    let swapCoor1, swapCoor2;
    for (let tile of player1Tile){
        tile.addEventListener('drag', (e) => {
            coor1 = parseInt(e.target.dataset.coor1);
            coor2 = parseInt(e.target.dataset.coor2);
        });
        tile.addEventListener('dragover', (e) => {
            e.preventDefault();
            swapCoor1 = parseInt(e.target.dataset.coor1);
            swapCoor2 = parseInt(e.target.dataset.coor2);
        });
        tile.addEventListener('drop', (e) => {
            e.preventDefault();
            let temp = playerBoard[coor1][coor2];
            playerBoard[coor1][coor2] = 'o';
            if (isValidPlacement(player, [[swapCoor1, swapCoor2]])){
                [playerBoard[coor1][coor2], playerBoard[swapCoor1][swapCoor2]] = [playerBoard[swapCoor1][swapCoor2], playerBoard[coor1][coor2]];
                updateShipTiles(coor1, coor2, swapCoor1, swapCoor2);
            }
            else{
                playerBoard[coor1][coor2] = temp;
                alert('Not valid placement');
            }
        });
    }
}

function isInstanceOfShip(coor){
    return coor instanceof Ship;
}

export function includes(arr, coor){
    
    for(let e of arr){
        if (e.every((x, i) => x == coor[i])) return true;
    }
    return false;
}