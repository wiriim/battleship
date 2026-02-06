import { Ship } from "./ship";
import { includes } from "./main";

function initPlayerGameboard(player1){
    const p1Board = document.querySelector('.player1-gameboard');
    const p2Board = document.querySelector('.player2-gameboard');

    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
            const tile = document.createElement('div');
            tile.classList.add('player1-tile');
            tile.style.width = `${p1Board.clientWidth / 10}px`;
            tile.style.height = `${p1Board.clientHeight / 10}px`;
            tile.style.border = '1px solid black';
            tile.style.fontSize = '0.8rem';
            tile.dataset.coor1 = i;
            tile.dataset.coor2 = j;
            tile.textContent = `${i}, ${j}`;

            const tile2 = tile.cloneNode(true);
            tile2.classList.replace('player1-tile', 'player2-tile');

            player1.gameboard.board[i][j] instanceof Ship ? tile.style.background = "rgba(0, 255, 0, .2)" : "none";
            p1Board.appendChild(tile);

            // player2.gameboard.board[i][j] instanceof Ship ? tile2.style.background = "rgba(0, 255, 0, .2)" : "none";
            p2Board.appendChild(tile2);
        }
    }
}

function updatePlayer1Gameboard(player){
    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
            if (includes(player.gameboard.attacked, [i,j])){
                const tile = document.querySelector(`.player1-tile[data-coor1="${i}"][data-coor2="${j}"]`);
                tile.style.background = "grey";
            }
        }
    }
}
function updatePlayer2Gameboard(player){
    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
            if (includes(player.gameboard.attacked, [i,j])){
                const tile = document.querySelector(`.player2-tile[data-coor1="${i}"][data-coor2="${j}"]`);
                tile.style.background = "grey";
            }
        }
    }
}

export { initPlayerGameboard, updatePlayer1Gameboard, updatePlayer2Gameboard }