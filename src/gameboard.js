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
                for (let coor of receiver.coor){
                    let coor1 = coor[0];
                    let coor2 = coor[1];
                    if (this.isInboundHeight(coor1-1) 
                        && !(this.board[coor1-1][coor2] instanceof Ship)) this.attacked.push([coor1-1,coor2]);
                    
                    if (this.isInboundHeight(coor1+1)
                        && !(this.board[coor1+1][coor2] instanceof Ship)) this.attacked.push([coor1+1,coor2]);
                    
                    if (this.isInboundLength(coor2-1)
                        && !(this.board[coor1][coor2-1] instanceof Ship)) this.attacked.push([coor1,coor2-1]);
                    
                    if (this.isInboundLength(coor2+1)
                        && !(this.board[coor1][coor2+1] instanceof Ship)) this.attacked.push([coor1,coor2+1]);
                    
                    if (this.isInboundHeight(coor1-1) && this.isInboundLength(coor2-1)) this.attacked.push([coor1-1,coor2-1]);
                    if (this.isInboundHeight(coor1-1) && this.isInboundLength(coor2+1)) this.attacked.push([coor1-1,coor2+1]);
                    if (this.isInboundHeight(coor1+1) && this.isInboundLength(coor2-1)) this.attacked.push([coor1+1,coor2-1]);
                    if (this.isInboundHeight(coor1+1) && this.isInboundLength(coor2+1)) this.attacked.push([coor1+1,coor2+1]);
                }
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
                if (this.board[i][j] instanceof Ship && !this.board[i][j].isSunk) return this.gameOver = false;
            }
        }
        return this.gameOver = true;
    }

    isInboundHeight(coor){
        if (coor >= 0 && coor < this.height){
            return true;
        }
        return false;
    }

    isInboundLength(coor){
        if (coor >= 0 && coor < this.length){
            return true;
        }
        return false;
    }
}