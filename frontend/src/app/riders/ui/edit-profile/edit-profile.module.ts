import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';



@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports:[
    EditProfileComponent
  ]
})
export class EditProfileModule { }
