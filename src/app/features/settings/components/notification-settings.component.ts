// components/notification-settings.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

/**
 * Component responsible for notification preferences
 * Implements a presentational component pattern
 */
@Component({
  selector: 'app-notification-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    FontAwesomeModule,
  ],
  template: `
    <mat-card class="h-full">
      <mat-card-header>
        <mat-card-title>
          <h2 class="text-xl font-semibold" role="heading" aria-level="2">
            Notification Settings
          </h2>
        </mat-card-title>
      </mat-card-header>

      <mat-card-content class="mt-4">
        <div class="flex flex-col space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <fa-icon [icon]="bellIcon"></fa-icon>
              <span>Enable Notifications</span>
            </div>
            <mat-slide-toggle
              [checked]="enabled"
              (change)="onToggle($event.checked)"
              color="primary"
              aria-label="Toggle notifications"
            >
            </mat-slide-toggle>
          </div>

          <div class="text-sm text-gray-600 dark:text-gray-400" *ngIf="enabled">
            <p>You will receive notifications for:</p>
            <ul class="list-disc ml-4 mt-2">
              <li>Security alerts</li>
              <li>Account updates</li>
              <li>New features</li>
            </ul>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class NotificationSettingsComponent {
  @Input() enabled?: boolean = false;
  @Output() toggleNotifications = new EventEmitter<boolean>();

  readonly bellIcon = faBell;

  /**
   * Handles notification toggle and emits the new state
   * @param checked - The new toggle state
   */
  onToggle(checked: boolean): void {
    this.toggleNotifications.emit(checked);
  }
}
