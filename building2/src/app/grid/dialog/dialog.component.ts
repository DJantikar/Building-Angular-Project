import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DrawingService } from "app/drawing.service";
import { Canvas } from "app/canvas.model";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  myCanvas : Canvas;

  @ViewChild('length') length : ElementRef;
  @ViewChild('radius') radius : ElementRef;
  @ViewChild('selectedObject') obj : ElementRef;
  
  constructor(private ds : DrawingService) { }

  ngOnInit() {
    this.myCanvas = this.ds.myCanvas;
  }

  onSubmit(){
    var l : number  = this.length.nativeElement.value;
    var r : number = this.radius.nativeElement.value;
    var objType : string = this.obj.nativeElement.value;
    this.ds.addToCanvas(l,r,objType);
  }
}
