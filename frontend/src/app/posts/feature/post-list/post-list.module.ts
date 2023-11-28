import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponentRoutingModule } from './post-list-routing.module';
import { PostListComponent } from './post-list.component';
import { SinglePostModule } from '../../ui/single-post/single-post.module';

@NgModule({
  declarations: [PostListComponent],
  imports: [CommonModule,PostListComponentRoutingModule,SinglePostModule],
})
export class PostListModule {}