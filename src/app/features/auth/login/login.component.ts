/**
 * @file login.component.ts
 * @description Login page component providing user authentication interface
 * @module AuthModule
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <!-- Add your login form here -->
      </div>
    </div>
  `,
})
export class LoginComponent {}
