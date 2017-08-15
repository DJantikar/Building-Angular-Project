import { Column } from "app/shared/Column.model";
import { Beam } from "app/shared/Beam.model";

export class CanvasObject{
    constructor(public c: Column,
                public b : Beam ){}
                
}