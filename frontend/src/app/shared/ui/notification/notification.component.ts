import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input()
  openNotificationBar!: boolean;
closeModal() {
  this.openNotificationBar=!this.openNotificationBar;
}
}
