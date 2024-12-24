// components/fluid-container.component.ts

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { FluidContainerService } from '@shared/services/fluid-container.service';
import { FluidContainerState, FluidContainerConfig } from '@shared/types/fluid-container.types';

/**
 * A reusable fluid container component that adapts to different screen sizes
 * and provides loading and error states
 */
@Component({
  selector: 'app-fluid-container',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, FontAwesomeModule],
  template: `
    <div
      class="fluid-container"
      [ngClass]="(state$ | async)?.config?.customClass"
      [ngStyle]="getContainerStyles((state$ | async)?.config)"
      role="region"
      [attr.aria-busy]="(state$ | async)?.isLoading"
      [attr.aria-invalid]="!!(state$ | async)?.error">

      <!-- Loading State -->
      <div
        *ngIf="(state$ | async)?.isLoading"
        class="loading-overlay"
        role="alert"
        aria-label="Loading content">
        <mat-spinner diameter="48"></mat-spinner>
      </div>

      <!-- Error State -->
      <div
        *ngIf="(state$ | async)?.error"
        class="error-message"
        role="alert">
        <fa-icon [icon]="errorIcon" class="error-icon"></fa-icon>
        <span>{{ (state$ | async)?.error }}</span>
      </div>

      <!-- Content -->
      <div
        class="container-content"
        [class.content-blurred]="(state$ | async)?.isLoading">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .fluid-container {
      position: relative;
      margin: 0 auto;
      width: 100%;
      height: 100%;
      @apply bg-white dark:bg-gray-800 rounded-lg shadow-md;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 10;
    }

    .error-message {
      position: absolute;
      top: 1rem;
      left: 1rem;
      right: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      border-radius: 0.375rem;
      @apply bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100;
    }

    .error-icon {
      font-size: 1.25rem;
    }

    .container-content {
      transition: filter 0.3s ease;
    }

    .content-blurred {
      filter: blur(2px);
    }
  `]
})
export class FluidContainerComponent implements OnInit {
  /** Icon for error messages */
  readonly errorIcon = faExclamationTriangle;

  /** Observable of the container state */
  state$: Observable<FluidContainerState>;

  /** Input configuration that overrides store config */
  @Input() set config(value: Partial<FluidContainerConfig>) {
    if (value) {
      this.fluidContainerService.updateConfig(value);
    }
  }

  constructor(private fluidContainerService: FluidContainerService) {
    this.state$ = this.fluidContainerService.getState();
  }

  ngOnInit(): void {
    // Initial setup if needed
  }

  /**
   * Generates container styles based on configuration
   * @param config Container configuration
   * @returns Object with CSS styles
   */
  getContainerStyles(config?: FluidContainerConfig): Record<string, string> {
    if (!config) return {};

    return {
      maxWidth: config.isFullWidth ? '100%' : (config.maxWidth || '1200px'),
      minWidth: config.minWidth || '320px',
      padding: config.padding || '1rem',
    };
  }
}
