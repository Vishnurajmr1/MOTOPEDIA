import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() markAsRead: EventEmitter<boolean> = new EventEmitter<boolean>();
  closeModal() {
    this.openNotificationBar = !this.openNotificationBar;
  }
  updateNotificationsAsRead() {
    this.markAsRead.emit(true);
  }
}
