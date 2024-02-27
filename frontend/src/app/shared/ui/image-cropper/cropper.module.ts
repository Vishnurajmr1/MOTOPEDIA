import { NgModule } from "@angular/core";
import { ImageCropperComponent } from './image-cropper.component';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
    ImageCropperComponent
  ],
  imports:[
    CommonModule
  ],
  exports:[ImageCropperComponent]

})
export class CropperModule{}