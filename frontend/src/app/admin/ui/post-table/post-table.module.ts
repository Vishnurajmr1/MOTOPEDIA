import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostTableComponent } from './post-table.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [PostTableComponent],
  imports: [CommonModule,MatTableModule],
  exports: [PostTableComponent],
})
export class PostTableModule {}
