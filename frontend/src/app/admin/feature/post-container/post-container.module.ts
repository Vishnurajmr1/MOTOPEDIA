import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostContainerComponent } from './post-container.component';
import { PostContainerComponentRoutingModule } from './post-container-routing.module';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PostTableModule } from '../../ui/post-table/post-table.module';

@NgModule({
  declarations: [PostContainerComponent],
  imports: [
    CommonModule,
    PostContainerComponentRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    PostTableModule
  ],
  exports: [PostContainerComponent],
})
export class PostContainerModule {}
