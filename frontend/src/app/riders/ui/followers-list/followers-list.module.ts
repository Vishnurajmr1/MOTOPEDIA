import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowersListComponent } from './followers-list.component';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FollowersListComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    RouterModule
  ],
  exports:[
    FollowersListComponent
  ]
})
export class FollowersListModule { }
