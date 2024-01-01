import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPostComponent } from './list-post.component';



@NgModule({
  declarations: [
    ListPostComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ListPostComponent]
})
export class ListPostModule { }
