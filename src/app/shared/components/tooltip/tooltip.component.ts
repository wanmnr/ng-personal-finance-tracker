// shared/components/tooltip/tooltip.component.ts

import {
  Component,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatRippleModule } from '@angular/material/core';
import { TooltipPosition, TooltipTheme } from '@shared/types/tooltip.types';

/**
 * @description
 * Component that renders the tooltip content with proper styling and animations
 */
@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, MatRippleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="tooltip-container"
      [ngClass]="[position, theme]"
      role="tooltip"
      [attr.aria-label]="content">
      <div class="tooltip-content">
        {{ content }}
      </div>
    </div>
  `,
  styles: [`
    :host {
      @apply block;
    }

    .tooltip-container {
      @apply px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs break-words
             animate-fade-in z-50;

      &.dark {
        @apply bg-gray-800 text-white;
      }

      &.light {
        @apply bg-white text-gray-800 border border-gray-200;
      }

      &.top {
        @apply mb-2;
      }

      &.bottom {
        @apply mt-2;
      }

      &.left {
        @apply mr-2;
      }

      &.right {
        @apply ml-2;
      }
    }

    .tooltip-content {
      @apply flex items-center gap-2;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .animate-fade-in {
      animation: fadeIn 0.2s ease-in-out;
    }
  `]
})
export class TooltipComponent {
  @Input() content = '';
  @Input() position: TooltipPosition = 'top';
  @Input() theme: TooltipTheme = 'dark';
}
