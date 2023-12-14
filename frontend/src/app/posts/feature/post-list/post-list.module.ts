import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostListRoutingModule } from './post-list-routing.module';
import { PostListComponent } from './post-list.component';
import { PostCardModule } from '../../ui/post-card/post-card.module';
import { CreatePostModule } from '../../ui/create-post/create-post.module';
import { PostCommentsModule } from '../../ui/post-comments/post-comments.module';


@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    PostListRoutingModule,
    PostCardModule,
    CreatePostModule,
    PostCommentsModule
  ]
})
export class PostListModule { }
