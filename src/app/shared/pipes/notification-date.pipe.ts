// notification-date.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import {
  formatDistanceToNow,
  format,
  parseISO,
  isToday,
  isYesterday,
} from 'date-fns';

@Pipe({
  name: 'notificationDate',
  standalone: true,
})
export class NotificationDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    const date = typeof value === 'string' ? parseISO(value) : value;

    // For recent notifications (less than 24 hours old)
    const minutesAgo = (new Date().getTime() - date.getTime()) / (1000 * 60);
    if (minutesAgo < 60) {
      return formatDistanceToNow(date, { addSuffix: true });
    }

    // For today's notifications
    if (isToday(date)) {
      return format(date, "'Today at' h:mm a");
    }

    // For yesterday's notifications
    if (isYesterday(date)) {
      return format(date, "'Yesterday at' h:mm a");
    }

    // For older notifications
    return format(date, 'MMM d, yyyy h:mm a');
  }
}
