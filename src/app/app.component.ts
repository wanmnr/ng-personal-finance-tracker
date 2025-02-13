/**
 * @file app.component.ts
 * @module app/root
 * @description Root component of the personal finance tracker application
 */

import { Component, inject, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FullScreenLoadingSpinnerComponent } from './shared/components/loading-spinner/full-screen-loading-spinner.component.ts';
import { MainComponent } from './layout/main/main1.component';
import { SpinnerService } from './shared/services/spinner.service';

/**
 * @remarks
 * Features:
 * - Serves as the application shell
 * - Manages global loading state through SpinnerService
 * - Integrates main layout component and full-screen loading indicator
 *
 * Loading States:
 * - Handles application-wide loading indicators
 * - Provides example implementation for async operations
 * - Can be configured to show loading state during initialization
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, NgxSpinnerModule, FullScreenLoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ng-personal-finance-tracker';

  private spinnerService = inject(SpinnerService);

  constructor() {}

  ngOnInit(): void {
    // Optional: Show spinner when app initializes
    // this.spinnerService.show();
    this.dataOperation();
  }

  private async dataOperation() {
    this.spinnerService.show();
    try {
      // await fetchData();
    } finally {
      // Simulating an API call
      setTimeout(() => {
        this.spinnerService.hide();
      }, 2000);
    }
  }

  fetchData() {
    throw new Error('Function not implemented.');
  }
}
