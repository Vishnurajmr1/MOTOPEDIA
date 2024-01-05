import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card.component';
import { EditPostModule } from '../edit-post/edit-post.module';



@NgModule({
  declarations: [
    PostCardComponent
  ],
  imports: [
    CommonModule,
    EditPostModule
  ],
  exports:[PostCardComponent]
})
export class PostCardModule { }
