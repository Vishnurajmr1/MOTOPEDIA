import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabContainerComponent } from './tab-container.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TabContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[TabContainerComponent]
})
export class TabContainerModule { }
