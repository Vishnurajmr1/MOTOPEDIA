import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPostComponent } from './edit-post.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditPostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
    EditPostComponent
  ]
})
export class EditPostModule { }
