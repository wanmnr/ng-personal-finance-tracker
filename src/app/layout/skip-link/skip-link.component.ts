// layout/skip-link/skip-link.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skip-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      href="#main-content"
      class="skip-link sr-only focus:not-sr-only">
      Skip to main content
    </a>
  `,
  styles: [`
    .skip-link {
      @apply absolute left-0 p-2 -translate-y-full bg-primary text-on-primary;
      &:focus {
        @apply translate-y-0;
      }
    }
  `]
})
export class SkipLinkComponent { }
