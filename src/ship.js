export class Ship{
    timesHit = 0;
    isSunk = false;
    constructor(coor){
        this.length = coor.length;
        this.coor = coor;
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


