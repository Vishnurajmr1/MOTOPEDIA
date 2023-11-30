import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostButtonComponent } from './create-post-button.component';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePostModule } from '../create-post/create-post.module';



@NgModule({
  declarations: [
    CreatePostButtonComponent
  ],
  imports: [
    CommonModule,
    CreatePostModule
  ],
  exports:[CreatePostButtonComponent]
})
export class CreatePostButtonModule { }
