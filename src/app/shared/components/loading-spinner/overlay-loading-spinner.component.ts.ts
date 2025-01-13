// shared/components/loading-spinner/overlay-loading-spinner.component.ts

import { Component } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div *ngIf="loadingService.isLoading$ | async" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styles: [
    `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }

      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class OverlayLoadingSpinnerComponent {
  constructor(public loadingService: LoadingService) {}
}
