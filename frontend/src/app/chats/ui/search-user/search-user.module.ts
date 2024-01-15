import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchUserComponent } from './search-user.component';



@NgModule({
  declarations: [
    SearchUserComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SearchUserComponent
  ]
})
export class SearchUserModule { }
