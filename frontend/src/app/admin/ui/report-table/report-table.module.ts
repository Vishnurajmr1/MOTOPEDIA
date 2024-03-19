import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTableComponent } from './report-table.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ReportTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports:[
    ReportTableComponent
  ]
})
export class ReportTableModule { }
