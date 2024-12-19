// demo-tooltip.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faInfoCircle,
  faQuestion,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { TooltipDirective } from '@shared/directives/tooltip.directive';

@Component({
  selector: 'app-demo-tooltip',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FontAwesomeModule,
    TooltipDirective
  ],
  template: `
    <div class="demo-container">
      <!-- Basic Usage -->
      <button
        mat-raised-button
        color="primary"
        appTooltip="This is a basic tooltip"
        class="demo-button">
        Basic Tooltip
      </button>

      <!-- Custom Position -->
      <button
        mat-raised-button
        color="accent"
        appTooltip="Tooltip on the right"
        tooltipPosition="right"
        class="demo-button">
        Right Position
      </button>

      <!-- Custom Theme -->
      <button
        mat-raised-button
        color="warn"
        appTooltip="Light theme tooltip"
        tooltipTheme="light"
        class="demo-button">
        Light Theme
      </button>

      <!-- With Icon -->
      <button
        mat-icon-button
        appTooltip="Important information here"
        tooltipPosition="bottom"
        class="demo-button">
        <fa-icon [icon]="faInfoCircle"></fa-icon>
      </button>

      <!-- Disabled State -->
      <button
        mat-raised-button
        appTooltip="You won't see this"
        [tooltipDisabled]="true"
        class="demo-button">
        Disabled Tooltip
      </button>

      <!-- Custom Delays -->
      <button
        mat-raised-button
        appTooltip="Delayed tooltip"
        [tooltipShowDelay]="1000"
        [tooltipHideDelay]="500"
        class="demo-button">
        Custom Delays
      </button>

      <!-- Complex Content -->
      <div
        class="info-box"
        appTooltip="This tooltip appears on a div element"
        tooltipPosition="left">
        Hover over this div
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      @apply p-8 flex flex-wrap gap-4 items-center justify-center;
    }

    .demo-button {
      @apply m-2;
    }

    .info-box {
      @apply p-4 border border-gray-300 rounded-lg cursor-help
             bg-gray-50 hover:bg-gray-100 transition-colors;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
      .demo-container {
        @apply flex-col items-stretch;
      }

      .demo-button {
        @apply w-full;
      }
    }
  `]
})
export class DemoTooltipComponent {
  // Font Awesome icons
  faInfoCircle = faInfoCircle;
  faQuestion = faQuestion;
  faExclamationTriangle = faExclamationTriangle;
}
