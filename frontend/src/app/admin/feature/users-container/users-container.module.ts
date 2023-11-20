import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersContainerComponent } from './users-container.component';
import { UserContainerRoutingModule } from './user-container-routing.module';



@NgModule({
  declarations: [
    UsersContainerComponent
  ],
  imports: [
    CommonModule,
    UserContainerRoutingModule
  ]
})
export class UsersContainerModule { }
