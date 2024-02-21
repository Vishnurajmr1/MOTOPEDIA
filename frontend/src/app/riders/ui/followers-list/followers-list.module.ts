import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowersListComponent } from './followers-list.component';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';



@NgModule({
  declarations: [
    FollowersListComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports:[
    FollowersListComponent
  ]
})
export class FollowersListModule { }
