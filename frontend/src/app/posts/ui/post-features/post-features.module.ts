import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFeaturesComponent } from './post-features.component';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';



@NgModule({
  declarations: [
    PostFeaturesComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports:[
    PostFeaturesComponent
  ]
})
export class PostFeaturesModule { }
