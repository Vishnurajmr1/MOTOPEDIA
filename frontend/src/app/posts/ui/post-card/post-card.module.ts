import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card.component';
import { EditPostModule } from '../edit-post/edit-post.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PostCardComponent
  ],
  imports: [
    CommonModule,
    EditPostModule,
    RouterModule
  ],
  exports:[PostCardComponent]
})
export class PostCardModule { }
