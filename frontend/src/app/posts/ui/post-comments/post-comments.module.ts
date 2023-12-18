import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCommentsComponent } from './post-comments.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PostCommentsComponent,
    PostCommentComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[PostCommentsComponent]
})
export class PostCommentsModule { }
