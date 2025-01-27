// store/notification.actions.ts

import { createAction, props } from '@ngrx/store';
import { INotification } from '../types/notification.types';

/**
 * Action creators for notification management
 */
export const addNotification = createAction(
  '[Notification] Add Notification',
  props<{ notification: INotification }>()
);

export const markAsRead = createAction(
  '[Notification] Mark As Read',
  props<{ id: string }>()
);

export const clearNotifications = createAction('[Notification] Clear All');

export const loadNotifications = createAction(
  '[Notification] Load Notifications'
);

export const loadNotificationsSuccess = createAction(
  '[Notification] Load Notifications Success',
  props<{ notifications: INotification[] }>()
);

export const loadNotificationsFailure = createAction(
  '[Notification] Load Notifications Failure',
  props<{ error: string }>()
);
