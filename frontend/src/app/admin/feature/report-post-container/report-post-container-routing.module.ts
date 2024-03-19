import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReportPostContainerModule } from './report-post-container.module';
import { ReportPostContainerComponent } from './report-post-container.component';

const routes: Routes = [
  {
    path: '',
    component: ReportPostContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPostContainerComponentRoutingModule {}
