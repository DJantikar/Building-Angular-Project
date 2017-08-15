import { Column } from "app/shared/Column.model";

export class Beam {
    constructor(public elementId:Number,
                public elementType : String , 
                public start:Column , 
                public end : Column ){}
}