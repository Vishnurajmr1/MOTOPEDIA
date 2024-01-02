import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    ReactiveFormsModule
  ],
  exports:[
    EditProfileComponent
  ]
})
export class EditProfileModule { }
