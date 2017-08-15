import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DrawingService } from "app/drawing.service";
import { GridComponent } from './grid/grid.component';
import { DialogComponent } from './grid/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ DrawingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
