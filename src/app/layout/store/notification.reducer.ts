// store/notification.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { NotificationState } from '../types/notification.types';
import * as NotificationActions from './notification.actions';

/**
 * Initial state for notifications
 */
export const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

/**
 * Notification reducer handling state updates
 */
export const notificationReducer = createReducer(
  initialState,

  on(NotificationActions.addNotification, (state, { notification }) => ({
    ...state,
    notifications: [notification, ...state.notifications],
    unreadCount: state.unreadCount + 1,
  })),

  on(NotificationActions.markAsRead, (state, { id }) => {
    const updatedNotifications = state.notifications.map((notification) =>
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    return {
      ...state,
      notifications: updatedNotifications,
      unreadCount: state.unreadCount - 1,
    };
  }),

  on(NotificationActions.clearNotifications, (state) => ({
    ...state,
    notifications: [],
    unreadCount: 0,
  }))
);
