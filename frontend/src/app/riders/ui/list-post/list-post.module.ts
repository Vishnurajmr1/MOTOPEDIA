import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPostComponent } from './list-post.component';
import { PostCardModule } from '../../../posts/ui/post-card/post-card.module';



@NgModule({
  declarations: [
    ListPostComponent
  ],
  imports: [
    CommonModule,
    PostCardModule
  ],
  exports:[ListPostComponent]
})
export class ListPostModule { }
