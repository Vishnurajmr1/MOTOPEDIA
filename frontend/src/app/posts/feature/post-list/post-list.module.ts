import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostListRoutingModule } from './post-list-routing.module';
import { PostListComponent } from './post-list.component';
import { PostCardModule } from '../../ui/post-card/post-card.module';
import { CreatePostButtonModule } from '../../ui/create-post-button/create-post-button.module';


@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    PostListRoutingModule,
    PostCardModule,
    CreatePostButtonModule
  ]
})
export class PostListModule { }
