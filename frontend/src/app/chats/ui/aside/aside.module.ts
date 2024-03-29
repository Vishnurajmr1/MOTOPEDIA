import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside.component';
import { TimeAgoModule } from 'src/app/shared/pipes/time-ago.module';



@NgModule({
  declarations: [
    AsideComponent
  ],
  imports: [
    CommonModule,
    TimeAgoModule
  ],
  exports:[
    AsideComponent
  ]
})
export class AsideModule { }
