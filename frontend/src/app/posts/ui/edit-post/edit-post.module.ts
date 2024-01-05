import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPostComponent } from './edit-post.component';



@NgModule({
  declarations: [
    EditPostComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    EditPostComponent
  ]
})
export class EditPostModule { }
