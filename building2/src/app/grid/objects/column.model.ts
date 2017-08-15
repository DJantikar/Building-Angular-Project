export class Column{
     startX : number;
     startY : number;
     length : number;
     radius : number;
     type : string;
     constructor(x : number,y : number,l : number,r : number ){
        this.startX = x;
        this.startY = y;
        this.length = l;
        this.radius = r;
        this.type = "Column";
     }

}