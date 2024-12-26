// components/theme-settings.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

/**
 * Component responsible for theme selection and customization
 * Implements a presentational component pattern
 */
@Component({
  selector: 'app-theme-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    FontAwesomeModule
  ],
  template: `
    <mat-card class="h-full">
      <mat-card-header>
        <mat-card-title>
          <h2 class="text-xl font-semibold" role="heading" aria-level="2">
            Theme Settings
          </h2>
        </mat-card-title>
      </mat-card-header>

      <mat-card-content class="mt-4">
        <div class="flex flex-col space-y-4">
          <div class="flex justify-center space-x-4">
            <button
              [class.active]="currentTheme === 'light'"
              (click)="onThemeSelect('light')"
              class="theme-button p-4 rounded-lg transition-all duration-200"
              [attr.aria-label]="'Select light theme'"
              [attr.aria-pressed]="currentTheme === 'light'"
            >
              <fa-icon [icon]="sunIcon" size="2x"></fa-icon>
              <span class="block mt-2">Light</span>
            </button>

            <button
              [class.active]="currentTheme === 'dark'"
              (click)="onThemeSelect('dark')"
              class="theme-button p-4 rounded-lg transition-all duration-200"
              [attr.aria-label]="'Select dark theme'"
              [attr.aria-pressed]="currentTheme === 'dark'"
            >
              <fa-icon [icon]="moonIcon" size="2x"></fa-icon>
              <span class="block mt-2">Dark</span>
            </button>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .theme-button {
      @apply bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700;
      &.active {
        @apply bg-primary-500 text-white;
      }
    }
  `]
})
export class ThemeSettingsComponent {
  @Input() currentTheme?: 'light' | 'dark' = 'light';
  @Output() themeChange = new EventEmitter<'light' | 'dark'>();

  readonly sunIcon = faSun;
  readonly moonIcon = faMoon;

  /**
   * Handles theme selection and emits the selected theme
   * @param theme - The selected theme value
   */
  onThemeSelect(theme: 'light' | 'dark'): void {
    this.themeChange.emit(theme);
  }
}
