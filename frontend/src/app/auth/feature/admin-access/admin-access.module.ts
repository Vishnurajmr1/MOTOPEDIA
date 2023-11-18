import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAccessComponent } from './admin-access.component';
import { AdminAccessRouterModule } from './admin-access.routing.module';
import { LoginFormModule } from '../../ui/login-form/login-form.module';



@NgModule({
  declarations: [
    AdminAccessComponent
  ],
  imports: [
    CommonModule,
    AdminAccessRouterModule,LoginFormModule
  ],
  exports:[AdminAccessComponent]
})
export class AdminAccessModule { }
