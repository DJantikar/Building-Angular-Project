import { Component, 
        OnInit ,
        ViewChild ,
        ElementRef} from '@angular/core';

import { Column } from '../shared/Column.model'
import { Beam } from '../shared/Beam.model'
import { CanvasObject } from '../shared/CanvasObject.model'
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit{
  columnChecked : boolean = true;
  x:number = 0;
  y:number = 0;
  id:number =0;

  dummmyDist ;
  dummyObj : Column = new Column(100,'Column',0,0);

  columnPointX : number =0;
  columnPointY : number =0;
  
  linePoint1Selected : boolean = false;
  linePoint2Selected : boolean = false;

  line_Point_1 : Column = null;
  line_Point_2 : Column = null;

  ctx: CanvasRenderingContext2D;

  canvasElementSelected : String = 'Column';
   
  @ViewChild( 'canvasElement') canvasRef : ElementRef;
  

  canvasObjectsToFile  = [];
  canvasObjectsFromFile  = [];
  

  //canvasBeams : Beam[] = [];
  //canvasColumns : Column[] = [];
  
   ngOnInit() {
     //this.ctx = this.canvasRef.nativeElement.getContext('2d');
   }
   
   resetCoordinates(){
      this.linePoint1Selected = false;
      this.linePoint2Selected  = false;
      //this.canvasElementSelected='Column';
      this.line_Point_1  = null;
      this.line_Point_2  = null;
   }
  
  updateCoordinates(){
    // if(this.canvasElementSelected==='Column'){
    //   this.columnPointX = this.x;
    //   this.columnPointY = this.y;
    // }
    if(this.canvasElementSelected==='Beam'){
      var c : Column = this.columnExists();
      if(c === null){
          c = new Column(this.id+1 ,'Column', this.x,this.y);
          this.id++;
          this.drawCircle();
      }
      if(this.linePoint1Selected == false){
        this.line_Point_1=c;
        this.linePoint1Selected=true;
      }
      else{
        this.line_Point_2=c;
        this.linePoint2Selected=true;
      }
    }
    
   }

  processClick(){
    this.updateCoordinates();    
    switch(this.canvasElementSelected){
      case 'Column': 
                  if(!this.columnExists()){
                    this.drawCircle();
                    var colObj : Column = new Column(this.id+1 ,'Column',this.x,this.y);
                    this.canvasObjectsToFile.push(colObj);
                    this.id++;
                  }
                  break;
      case 'Beam': 
                  if(this.linePoint1Selected && this.linePoint2Selected){
                    //var end : Column  = new Column(this.id+2 ,'Column',this.line_Point_2_X,this.line_Point_2_Y);
                    //var start : Column  = new Column(this.id+1 ,'Column',this.line_Point_1_X,this.line_Point_1_Y);
                    var beamObj:Beam = new Beam(this.id+1 ,'Beam',this.line_Point_1,this.line_Point_2);                                 
                    this.canvasObjectsToFile.push(beamObj);
                    this.id++;
                    this.drawLine();
                  } 
                  break;

    }
  }
  columnExists(){
  var obj :any;
  var ret:boolean = false;
  var i:number=0;
  var circle2 = {radius: 2, x: this.x, y: this.y};
   while(i<this.canvasObjectsToFile.length){
     obj = this.canvasObjectsToFile[i];
     if(obj.elementType === 'Column'){

        var circle1 = {radius: 2 ,x: obj.x, y: obj.y};

        var dx = circle1.x - circle2.x;
        var dy = circle1.y - circle2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < circle1.radius + circle2.radius) {
          return obj;
          
        }
     }
    i++;
   }
    return null;
  }
  drawCircle(){
    //if(!this.columnExists()){
      this.ctx.fillStyle="blue";
      this.ctx.strokeStyle = "blue";
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fill();
    //}
  }
  drawLine(){
      this.ctx.beginPath();
      //this.ctx.fillStyle="blue";
      this.ctx.moveTo(this.line_Point_1.x,this.line_Point_1.y);
      this.ctx.lineTo(this.line_Point_2.x ,this.line_Point_2.y);
      this.ctx.strokeStyle = "green";
      this.ctx.stroke();
      //this.ctx.fill();
      this.resetCoordinates();
  }

  location(event : MouseEvent){

   this.x = event.layerX;// - this.ctx.canvas.offsetLeft;
   this.y = event.layerY;// - this.ctx.canvas.offsetTop;
  
  }
  updateSelection(canvasElement : String){
    this.canvasElementSelected = canvasElement;
    this.columnChecked = (canvasElement==='Column') ? true : false;
  } 
  saveCanvas(){
    var blob = new Blob([JSON.stringify(this.canvasObjectsToFile , null,"\t")], { type: 'text/json' });
    saveAs(blob,'sample'+Math.floor((Math.random() * 10000) + 1)+'.json');
  }
  clearCanvas(){
    this.resetCoordinates();
    this.canvasObjectsToFile=[];
    this.id=0;
    this.columnChecked=true;
    this.ctx.clearRect(0,0,1050,450);
  }
  openFile(event) {
    //let input = event.target;
    let fileList: FileList = event.target.files;
    for (var index = 0; index < fileList.length; index++) {
        let reader = new FileReader();
        reader.onload = () => {
          this.canvasObjectsFromFile= JSON.parse(reader.result);
          this.fireCanvas();
          //this.canvasObjectsFromFile.
        }
        reader.readAsText(fileList[index]);
        //reader.rea
    };
  }
  drawCircleFor(point : Column){
    this.x=point.x;
    this.y=point.y;
    if(!this.columnExists()){
      this.drawCircle();
      this.canvasObjectsToFile.push(point);
    }
  }
  fireCanvas(){
    if(this.canvasObjectsFromFile.length > 0){
      this.clearCanvas();
      let l : number = this.canvasObjectsFromFile.length;
      for(var i=0;i < l;i++){
        var obj = this.canvasObjectsFromFile[i];
        if(obj.elementType == 'Column' ){
          this.drawCircleFor(obj);
        }
        else {
            this.line_Point_1=obj.start;
            this.drawCircleFor(this.line_Point_1);
            this.line_Point_2=obj.end;
            this.drawCircleFor(this.line_Point_2);
            this.drawLine();
            this.canvasObjectsToFile.push(obj);
        }
      }

    }
  }
}
