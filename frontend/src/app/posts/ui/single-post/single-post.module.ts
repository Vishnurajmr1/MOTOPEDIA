import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePostComponent } from './single-post.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SinglePostComponent],
  imports: [CommonModule, RouterModule],
  exports: [SinglePostComponent],
})
export class SinglePostModule {}
