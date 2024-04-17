import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCallComponent } from './video-call.component';

@NgModule({
  declarations: [VideoCallComponent],
  imports: [CommonModule],
  exports: [VideoCallComponent],
})
export class VideoCallModule {}
