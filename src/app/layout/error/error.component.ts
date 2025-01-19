// layout/error/error.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900">Error</h1>
        <p class="mt-2 text-gray-600">Something went wrong</p>
        <a
          routerLink="/"
          class="mt-4 inline-block text-blue-600 hover:text-blue-800"
        >
          Return to Home
        </a>
      </div>
    </div>
  `,
})
export class ErrorComponent {}
