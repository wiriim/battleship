export class Ship{
    constructor(length, timesHit = 0, isSunk = false){
        this.length = length;
        this.timesHit = timesHit;
        this.isSunk = isSunk;
    }

    hit(){
        this.timesHit++;

        if (this.timesHit === this.length) 
            this.sunk();
    }

    sunk(){
        this.isSunk = true;
    }
}


