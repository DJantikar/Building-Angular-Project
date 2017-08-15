import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DrawingService } from "app/drawing.service";
import { Grid } from "app/shared/Grid.model";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit{

  ctx: CanvasRenderingContext2D;
  @ViewChild( 'canvasElement') canvasRef : ElementRef;

  mouseX=0;
  mouseY=0;
 

ngOnInit(): void {
   this.ctx = this.canvasRef.nativeElement.getContext('2d');
   this.draw();
}

draw(){
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for(var x=1;x<20;x++){ this.ctx.moveTo(x*100,0); this.ctx.lineTo(x*100,this.ctx.canvas.height); }
        for(var y=1;y<10;y++){ this.ctx.moveTo(0,y*100);this.ctx.lineTo(this.ctx.canvas.width,y*100); }
        this.ctx.fillStyle="lightblue";
        this.ctx.fill();
        //this.ctx.strokeStyle="gray";
        this.ctx.lineWidth=1;
        this.ctx.stroke();
        //this.drawMore();
        this.ctx.closePath();
}


handleMouseMove(e : MouseEvent){
      this.mouseX=e.layerX;
      this.mouseX = this.mouseX - (this.mouseX%10);
      this.mouseY=this.ctx.canvas.height-e.layerY;
      this.mouseY = this.mouseY - (this.mouseY%10);
}
}

