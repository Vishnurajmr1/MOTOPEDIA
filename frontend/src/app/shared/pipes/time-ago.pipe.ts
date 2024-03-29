import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(timeStamp: string): string {
    const messageTime = new Date(timeStamp);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - messageTime.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return interval === 1 ? interval + ' year ago' : interval + ' years ago';
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1
        ? interval + ' month ago'
        : interval + ' months ago';
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? interval + ' day ago' : interval + ' days ago';
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      const hours = messageTime.getHours();
      const minutes = messageTime.getMinutes();
      const amPm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert to 12-hour format
      return `${formattedHours}:${this.padZero(minutes)} ${amPm}`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1
        ? interval + ' minute ago'
        : interval + ' minutes ago';
    }

    return 'just now';
  }
  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
