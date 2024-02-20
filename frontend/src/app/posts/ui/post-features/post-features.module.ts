import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFeaturesComponent } from './post-features.component';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PostFeaturesComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    FormsModule
  ],
  exports:[
    PostFeaturesComponent
  ]
})
export class PostFeaturesModule { }
