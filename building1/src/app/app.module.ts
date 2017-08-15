import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { ObjectsComponent } from './objects/objects.component';

import { CanvasComponent } from './canvas/canvas.component';
import { DrawingService } from "app/drawing.service";

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ObjectsComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ DrawingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
