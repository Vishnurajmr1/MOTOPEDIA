import { Component, Input } from '@angular/core';
import { NotificationInterface } from '../../types/notification.interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  @Input()
  openNotificationBar!: boolean;
  @Input()
  getAllNotifications: NotificationInterface[] = [];
  closeModal() {
    this.openNotificationBar = !this.openNotificationBar;
  }
}
