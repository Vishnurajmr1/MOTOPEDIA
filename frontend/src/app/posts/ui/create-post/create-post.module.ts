import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';



@NgModule({
  declarations: [
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  exports:[CreatePostComponent]
})
export class CreatePostModule { }
