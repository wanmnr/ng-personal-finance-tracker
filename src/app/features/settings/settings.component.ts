// settings/settings.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SettingsState } from './store/state/settings.state';
import { SettingsActions } from './store/settings.actions';
import { SettingsService } from './services/settings.service';
import { ThemeSettingsComponent } from './components/theme-settings.component';
import { NotificationSettingsComponent } from './components/notification-settings.component';
import { AccessibilitySettingsComponent } from './components/accessibility-settings.component';

/**
 * Main Settings component that serves as a smart component managing the settings state
 * and coordinating child components
 */
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSliderModule,
    FontAwesomeModule,
    ThemeSettingsComponent,
    NotificationSettingsComponent,
    AccessibilitySettingsComponent,
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8" role="heading" aria-level="1">
        Settings
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Theme Settings -->
        <app-theme-settings
          [currentTheme]="(settings$ | async)?.theme ?? 'light'"
          (themeChange)="onThemeChange($event)"
        />

        <!-- Notification Settings -->
        <app-notification-settings
          [enabled]="(settings$ | async)?.notifications ?? false"
          (toggleNotifications)="onToggleNotifications($event)"
        />

        <!-- Accessibility Settings -->
        <app-accessibility-settings
          [settings]="
            (settings$ | async)?.accessibility ??
            { highContrast: false, screenReader: false }
          "
          (settingsChange)="onAccessibilityChange($event)"
        />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transition: none !important;
        }
      }
    `,
  ],
})
export class SettingsComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly settingsService = inject(SettingsService);

  settings$: Observable<SettingsState>;

  constructor() {
    this.settings$ = this.store.select((state) => state.settings);
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  /**
   * Loads initial settings from the backend
   */
  private loadSettings(): void {
    this.settingsService.getSettings().subscribe((settings) => {
      this.store.dispatch(SettingsActions.loadSettings({ settings }));
    });
  }

  /**
   * Handles theme changes from child component
   * @param theme - The new theme value
   */
  onThemeChange(theme: SettingsState['theme']): void {
    this.store.dispatch(SettingsActions.updateTheme({ theme }));
  }

  /**
   * Handles notification toggle from child component
   * @param enabled - The new notifications state
   */
  onToggleNotifications(enabled: boolean): void {
    this.store.dispatch(SettingsActions.toggleNotifications({ enabled }));
  }

  /**
   * Handles accessibility settings changes from child component
   * @param settings - The new accessibility settings
   */
  onAccessibilityChange(settings: SettingsState['accessibility']): void {
    this.store.dispatch(SettingsActions.updateAccessibility(settings));
  }
}
