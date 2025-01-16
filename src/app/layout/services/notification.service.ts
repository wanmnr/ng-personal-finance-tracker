// services/notification.service.ts

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { INotification, NotificationType } from '../models/notification.types';
import * as NotificationActions from '../store/notification.actions';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  /**
   * BehaviorSubject for local state management
   */
  private notificationsSubject = new BehaviorSubject<INotification[]>([]);

  constructor(private store: Store) { }

  /**
   * Creates and dispatches a new notification
   * @param type - Type of notification
   * @param title - Notification title
   * @param message - Notification message
   * @param data - Optional additional data
   */
  public createNotification(
    type: NotificationType,
    title: string,
    message: string,
    data?: any
  ): void {
    const notification: INotification = {
      id: uuidv4(),
      type,
      title,
      message,
      timestamp: new Date(),
      isRead: false,
      data
    };

    this.store.dispatch(NotificationActions.addNotification({ notification }));
  }

  /**
   * Marks a notification as read
   * @param id - Notification ID
   */
  public markAsRead(id: string): void {
    this.store.dispatch(NotificationActions.markAsRead({ id }));
  }

  /**
   * Clears all notifications
   */
  public clearAll(): void {
    this.store.dispatch(NotificationActions.clearNotifications());
  }
}
