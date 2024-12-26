// components/accessibility-settings.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUniversalAccess } from '@fortawesome/free-solid-svg-icons';

interface AccessibilitySettings {
  highContrast: boolean;
  screenReader: boolean;
}

/**
 * Component responsible for accessibility preferences
 * Implements a presentational component pattern
 */
@Component({
  selector: 'app-accessibility-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSliderModule,
    FontAwesomeModule,
  ],
  template: `
    <mat-card class="h-full">
      <mat-card-header>
        <mat-card-title>
          <h2 class="text-xl font-semibold" role="heading" aria-level="2">
            Accessibility Settings
          </h2>
        </mat-card-title>
      </mat-card-header>

      <mat-card-content class="mt-4">
        <div class="flex flex-col space-y-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <fa-icon [icon]="accessibilityIcon"></fa-icon>
              <span>High Contrast Mode</span>
            </div>
            <mat-slide-toggle
              [checked]="currentSettings.highContrast"
              (change)="onHighContrastChange($event.checked)"
              color="primary"
              aria-label="Toggle high contrast mode"
            >
            </mat-slide-toggle>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <fa-icon [icon]="accessibilityIcon"></fa-icon>
              <span>Screen Reader Optimization</span>
            </div>
            <mat-slide-toggle
              [checked]="currentSettings.screenReader"
              (change)="onScreenReaderChange($event.checked)"
              color="primary"
              aria-label="Toggle screen reader optimization"
            >
            </mat-slide-toggle>
          </div>

          <div class="text-sm text-gray-600 dark:text-gray-400 mt-4">
            <p>
              These settings help make the application more accessible for users
              with different needs.
            </p>
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
export class AccessibilitySettingsComponent {
  private defaultSettings: AccessibilitySettings = {
    highContrast: false,
    screenReader: false,
  };

  @Input()
  get settings(): AccessibilitySettings | undefined {
    return this._settings;
  }
  set settings(value: AccessibilitySettings | undefined) {
    this._settings = value;
  }
  private _settings?: AccessibilitySettings;

  get currentSettings(): AccessibilitySettings {
    return this._settings ?? this.defaultSettings;
  }

  @Output() settingsChange = new EventEmitter<AccessibilitySettings>();

  readonly accessibilityIcon = faUniversalAccess;

  /**
   * Handles high contrast mode changes
   * @param enabled - The new high contrast state
   */
  onHighContrastChange(enabled: boolean): void {
    const newSettings: AccessibilitySettings = {
      highContrast: enabled,
      screenReader: this.currentSettings.screenReader,
    };
    this.settingsChange.emit(newSettings);
  }

  /**
   * Handles screen reader optimization changes
   * @param enabled - The new screen reader state
   */
  onScreenReaderChange(enabled: boolean): void {
    const newSettings: AccessibilitySettings = {
      highContrast: this.currentSettings.highContrast,
      screenReader: enabled,
    };
    this.settingsChange.emit(newSettings);
  }
  /**
   * Alternative Approach: Spread Operator
   */
  // onScreenReaderChange(enabled: boolean): void {
  //   this.settingsChange.emit({
  //     ...this.settings,
  //     screenReader: enabled
  //   });
  // }
}
