import { Injectable, EventEmitter } from '@angular/core';
import { Canvas } from "app/canvas.model";
import { Column } from "app/grid/objects/column.model";

@Injectable()
export class DrawingService {
  canvasChanged = new EventEmitter<Object>();
  myCanvas : Canvas;
  canvasElements = [];

  intiatlizeCanvas( c : Canvas){
    this.myCanvas = c;
  }
  addToCanvas(length : number , radius : number , objType : string){
    switch (objType){       
      case 'column': 
       var column : Column = new Column(this.myCanvas.mouseX,
                                        this.myCanvas.mouseY,
                                        length,
                                        radius);
      this.canvasElements.push(column);
      this.canvasChanged.emit(column);
      break;
    }
    
  }
  constructor() { }

}
