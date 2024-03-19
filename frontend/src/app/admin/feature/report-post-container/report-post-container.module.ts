import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportPostContainerComponent } from './report-post-container.component';
import { ReportTableModule } from '../../ui/report-table/report-table.module';
import { ReportPostContainerComponentRoutingModule } from './report-post-container-routing.module';

@NgModule({
  declarations: [ReportPostContainerComponent],
  imports: [
    CommonModule,
    ReportTableModule,
    ReportPostContainerComponentRoutingModule,
  ],
  exports: [ReportPostContainerComponent],
})
export class ReportPostContainerModule {}
