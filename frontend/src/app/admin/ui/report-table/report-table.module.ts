import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTableComponent } from './report-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ReportTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:[
    ReportTableComponent
  ]
})
export class ReportTableModule { }
