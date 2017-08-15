import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DrawingService } from "app/drawing.service";
import { Canvas } from "app/canvas.model";
import { Column } from "app/grid/objects/column.model";
import * as THREE from 'three';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']

})
export class GridComponent implements OnInit {

  constructor(private ds:DrawingService) { }


  ctx: CanvasRenderingContext2D;
  @ViewChild( 'canvasElement') canvasRef : ElementRef;

  mouseX=0;
  mouseY=0;
 
  openDialog = false;

  scene ;
  camera ;
  renderer;


ngOnInit(): void {
   this.ctx = this.canvasRef.nativeElement.getContext('2d');
   this.draw();
   this.ds.intiatlizeCanvas(new Canvas(this.ctx,this.mouseX,this.mouseY));
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({canvas : this.canvasRef.nativeElement.canvas});
    this.renderer.setSize(this.ds.myCanvas.ctx.canvas.width, this.ds.myCanvas.ctx.canvas.height);
    // document.body.appendChild(renderer.domElement);
      // this.canvasRef.nativeElement.appendChild(renderer.domElement);
    this.camera.position.set(0,0,30)
    this.ds.canvasChanged.subscribe(
      (column : Column) => { this.addToCanvas(column);}
    );
 
}
addToCanvas(column : Column){
       
            var geometry = new THREE.CylinderGeometry( 5, 5, 20, 50 );
            var material = new THREE.MeshBasicMaterial( {wireframe:true,color: 0x0000FF} );
            var cylinder = new THREE.Mesh( geometry, material );
            this.scene.add( cylinder );
            this.renderer.render(this.scene, this.camera);
            // var render = function() {
            //   requestAnimationFrame(render);
              
            // };

            // render();
            //renderer.render(scene, camera);
}
drawCircle(column : Column){
    //if(!this.columnExists()){
      this.ds.myCanvas.ctx.fillStyle="blue";
      this.ds.myCanvas.ctx.strokeStyle = "blue";
      this.ds.myCanvas.ctx.beginPath();
      this.ds.myCanvas.ctx.arc(column.startX, column.startY, 20, 0, 2 * Math.PI);
      this.ds.myCanvas.ctx.stroke();
      this.ds.myCanvas.ctx.fill();
    //}
  }
draw(){
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for(var x=1;x<20;x++){ this.ctx.moveTo(x*100,0); this.ctx.lineTo(x*100,this.ctx.canvas.height); }
        for(var y=1;y<10;y++){ this.ctx.moveTo(0,y*100);this.ctx.lineTo(this.ctx.canvas.width,y*100); }
        this.ctx.fillStyle="lightblue";
        this.ctx.fill();
        this.ctx.strokeStyle="gray";
        this.ctx.lineWidth=1;
        this.ctx.stroke();
        this.ctx.closePath();
}


handleMouseMove(e : MouseEvent){
      this.mouseX=e.layerX;
      this.mouseX = this.mouseX - (this.mouseX%10);
      this.mouseY=this.ctx.canvas.height-e.layerY;
      this.mouseY = this.mouseY - (this.mouseY%10);
}
processClick(){
  this.openDialog=true;
  this.ds.myCanvas.mouseX=this.mouseX;
  this.ds.myCanvas.mouseY=this.mouseY;
}
}
