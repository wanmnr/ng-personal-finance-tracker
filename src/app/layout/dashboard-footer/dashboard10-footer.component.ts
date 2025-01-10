// layout/dashboard10-footer/dashboard-footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer-container">
      <div class="footer-content">
        <p class="text-sm text-gray-600">
          © {{ currentYear }} Personal Finance Tracker. All rights reserved.
        </p>
        <div class="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-container {
      @apply bg-surface border-t border-outline py-4 px-6;
    }

    .footer-content {
      @apply flex justify-between items-center;
    }

    .footer-links {
      @apply flex gap-4 text-sm text-primary;

      a {
        @apply hover:underline;
      }
    }
  `]
})
export class DashboardFooterComponent {
  protected currentYear = new Date().getFullYear();
}
