import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import {ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[CreatePostComponent]
})
export class CreatePostModule { }
