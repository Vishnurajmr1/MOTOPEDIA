import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAsideComponent } from './admin-aside.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminAsideComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[AdminAsideComponent]
})
export class AdminAsideModule { }
