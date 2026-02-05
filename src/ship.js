export class Ship{
    constructor(length, timesHit = 0, isSunk = false){
        this.length = length;
        this.timesHit = timesHit;
        this.isSunk = isSunk;
    }

    hit(){
        this.timesHit++;
    }

    sunk(){
        this.isSunk = true;
    }
}


