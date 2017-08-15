import { OnInit, ViewChild, ElementRef } from "@angular/core";
import { Grid } from "app/shared/Grid.model";

export class DrawingService implements OnInit {

   grid : Grid;


    ngOnInit(): void {
        
    }
    
    initGrid(g : Grid){
       this.grid=g;
    }

    drawGrid(){

    }
}