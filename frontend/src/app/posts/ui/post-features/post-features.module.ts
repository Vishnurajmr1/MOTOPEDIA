import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFeaturesComponent } from './post-features.component';



@NgModule({
  declarations: [
    PostFeaturesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PostFeaturesComponent
  ]
})
export class PostFeaturesModule { }
