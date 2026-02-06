import { Ship } from "./ship";

export class Gameboard{
    attacked = [];
    gameOver = false;
    length = 10;
    height = 10;
    constructor(){
        this.board = [];
        this.initBoard();
    }

    placeShip(ship){
        for (let coor of ship.coor){
            this.board[coor[0]][coor[1]] = ship;
        }
    }

    receiveAttack(coor1, coor2){
        let receiver = this.board[coor1][coor2];
        if (receiver instanceof Ship && !receiver.isSunk){
            receiver.hit();

            if (receiver.isSunk){
                //Add hit to all surrounding ship tiles
            }
            this.checkGameOver();
        }
        this.attacked.push([coor1,coor2]);
    }

    initBoard(){
        let arr;
        for (let i = 0; i < this.height; i++){
            arr = [];
            for (let j = 0; j < this.length; j++){
                arr.push('o');
            }
            this.board.push(arr);
        }
    }

    checkGameOver(){
        for (let i = 0; i < this.height; i++){
            for (let j = 0; j < this.length; j++){
                if (this.board[i][j] instanceof Ship && !this.board[i][j].isSunk) return false;
            }
        }
        return this.gameOver = true;
    }
}