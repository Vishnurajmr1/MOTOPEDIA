import { NgModule } from '@angular/core';
import { SearchUserListComponent } from './search-user-list.component';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SearchUserListComponent],
  imports: [CommonModule,ModalModule,RouterModule],
  exports:[SearchUserListComponent]
})
export class SearchUserList {}
