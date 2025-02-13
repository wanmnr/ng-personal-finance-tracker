/**
 * @file notification-panel.component.ts
 * @module app/layout/header/notification-panel
 *
 * @description Interactive notification panel that displays and manages system notifications
 *
 * @remarks
 * The notification panel provides a centralized interface for displaying system notifications with:
 * - Different notification types (info, success, warning, error)
 * - Read/unread status tracking
 * - Notification count management
 * - Responsive design for mobile and desktop views
 * - Click handling for individual notifications
 * - Bulk clearing functionality
 *
 * Each notification includes:
 * - Icon indicating the notification type
 * - Title and message content
 * - Timestamp
 * - Visual indicators for unread status
 */

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faCheck,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { INotification, NotificationState, NotificationType } from '../../types/notification.types';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { NotificationDatePipe } from '@app/shared/pipes/notification-date.pipe';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NotificationDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .notification-panel {
        @apply bg-white rounded-lg shadow-lg p-4 w-full max-w-md;

        .notification-header {
          @apply flex justify-between items-center mb-4 pb-2 border-b border-gray-200;
        }

        .notifications-list {
          @apply overflow-y-auto;
        }

        .notification-item {
          @apply flex items-start p-3 mb-2 rounded-md cursor-pointer transition-all duration-200;
          @apply hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;

          &.unread {
            @apply bg-blue-50;
          }

          &.info {
            @apply border-l-4 border-blue-500;
            .notification-icon {
              @apply text-blue-500;
            }
          }

          &.success {
            @apply border-l-4 border-green-500;
            .notification-icon {
              @apply text-green-500;
            }
          }

          &.warning {
            @apply border-l-4 border-yellow-500;
            .notification-icon {
              @apply text-yellow-500;
            }
          }

          &.error {
            @apply border-l-4 border-red-500;
            .notification-icon {
              @apply text-red-500;
            }
          }
        }

        .notification-icon {
          @apply mr-3 mt-1;
        }

        .notification-content {
          @apply flex-1;
        }

        .notification-title {
          @apply font-medium text-gray-900 mb-1;
        }

        .notification-message {
          @apply text-sm text-gray-600;
        }

        .notification-time {
          @apply text-xs text-gray-400 block mt-1;
        }
      }

      @media (max-width: 640px) {
        .notification-panel {
          @apply max-w-full;
        }
      }
    `,
  ],
})
export class NotificationPanelComponent implements OnInit {
  @Input() maxHeight = '400px';
  @Output() notificationClick = new EventEmitter<INotification>();

  notifications$: Observable<INotification[]> = new Observable<INotification[]>();
  unreadCount$: Observable<number> = new Observable<number>();
  NotificationType = NotificationType;

  constructor(
    private store: Store<{ notifications: NotificationState }>,
    private notificationService: NotificationService,
    private faLibrary: FaIconLibrary
  ) {
    this.faLibrary.addIcons(faBell, faCheck, faExclamationTriangle, faInfoCircle, faTimes);
  }

  ngOnInit(): void {
    this.notifications$ = this.store.pipe(select((state) => state.notifications.notifications));
    this.unreadCount$ = this.store.pipe(select((state) => state.notifications.unreadCount));
  }

  /**
   * Handles notification click event
   * @param notification - Clicked notification
   */
  onNotificationClick(notification: INotification): void {
    if (!notification.isRead) {
      this.notificationService.markAsRead(notification.id);
    }
    this.notificationClick.emit(notification);
  }

  /**
   * Clears all notifications
   */
  clearAll(): void {
    this.notificationService.clearAll();
  }
}
