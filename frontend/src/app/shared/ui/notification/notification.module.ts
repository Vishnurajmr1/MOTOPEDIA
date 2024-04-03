import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { TimeAgoModule } from '../../pipes/time-ago.module';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule,TimeAgoModule],
  exports: [NotificationComponent],
})
export class NotificationModule {}
