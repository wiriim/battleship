import { Ship } from "./ship";

function initPlayerGameboard(player1, player2){
    const p1Board = document.querySelector('.player1-gameboard');
    const p2Board = document.querySelector('.player2-gameboard');
    console.log(p1Board.clientWidth);

    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
            const tile = document.createElement('div');
            tile.style.width = `${p1Board.clientWidth / 10}px`;
            tile.style.height = `${p1Board.clientHeight / 10}px`;
            tile.style.border = "1px solid black";
            const tile2 = tile.cloneNode(true);

            player1.gameboard.board[i][j] instanceof Ship ? tile.style.background = "rgba(0, 255, 0, .2)" : "none";
            p1Board.appendChild(tile);

            player2.gameboard.board[i][j] instanceof Ship ? tile2.style.background = "rgba(0, 255, 0, .2)" : "none";
            p2Board.appendChild(tile2);
        }
    }
}

export { initPlayerGameboard }