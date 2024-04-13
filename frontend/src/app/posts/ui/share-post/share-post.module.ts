import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharePostComponent } from './share-post.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons'

@NgModule({
  declarations: [SharePostComponent],
  imports: [CommonModule,ShareButtonsModule,ShareIconsModule],
  exports: [SharePostComponent],
})
export class SharePostModule {}
