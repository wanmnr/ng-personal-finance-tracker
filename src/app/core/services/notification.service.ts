// core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  getNotifications(): Observable<any[]> {
    return of([]); // Replace with actual notification logic
  }

  markAllAsRead(): Observable<void> {
    return of(void 0); // Replace with actual implementation
  }
}
