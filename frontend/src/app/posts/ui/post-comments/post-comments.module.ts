import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCommentsComponent } from './post-comments.component';



@NgModule({
  declarations: [
    PostCommentsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[PostCommentsComponent]
})
export class PostCommentsModule { }
