import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCommentsComponent } from './post-comments.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';



@NgModule({
  declarations: [
    PostCommentsComponent,
    PostCommentComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[PostCommentsComponent]
})
export class PostCommentsModule { }
