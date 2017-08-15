import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

   ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
           // this.ctx = this.canvasRef.nativeElement.getContext('2d');
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(45, 1000/400, 1, 1000);
 
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(1000, 400);
            renderer.fillStyle="lightblue";
            this.ctx = renderer.getContext('2d')
            document.body.appendChild(renderer.domElement);
            //document.getElementById("canvas").appendChild(renderer.domElement);
            camera.position.set(0,0,30)
           // this.draw();
            // var geometry = new THREE.CylinderBufferGeometry( 5, 5, 20, 32 );
            // var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
            // var cylinder = new THREE.Mesh( geometry, material );

            
            var geometry = new THREE.CylinderGeometry( 5, 5, 20, 50 );
            var material = new THREE.MeshBasicMaterial( {wireframe:true,color: 0x0000FF} );
            var cylinder = new THREE.Mesh( geometry, material );
            scene.add( cylinder );
            renderer.render(scene, camera);
            // cylinder.position.set(0,0,0);
            // scene.add(cylinder);
 
            // var render = function () {
            //     requestAnimationFrame(render);
 
              
 
         
 
            //     renderer.render(scene, camera);
            // };
 
            // // Calling the render function
            // render();
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

}
