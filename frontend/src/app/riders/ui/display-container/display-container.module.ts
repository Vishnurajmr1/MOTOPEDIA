import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayContainerComponent } from './display-container.component';



@NgModule({
  declarations: [
    DisplayContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DisplayContainerComponent
  ]
})
export class DisplayContainerModule { }
