import { RouterModule, Routes } from '@angular/router';
import { PostContainerComponent } from './post-container.component';
import { NgModule } from '@angular/core';
import { ReportTableModule } from '../../ui/report-table/report-table.module';

const routes: Routes = [
  {
    path: '',
    component: PostContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostContainerComponentRoutingModule {}
