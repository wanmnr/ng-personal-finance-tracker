// @app/app/app2.component.ts
// Approach 2: Responsive Layout with Tailwind and Font Awesome
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faUser,
  faCog,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <!-- Main Content -->
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Grid Layout -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div *ngFor="let card of cards"
                 class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <fa-icon [icon]="card.icon"
                            class="text-2xl text-indigo-600">
                    </fa-icon>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        {{card.title}}
                      </dt>
                      <dd class="text-lg font-medium text-gray-900">
                        {{card.value}}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class AppComponent {
  cards = [
    { title: 'Home', value: '1,234', icon: faHome },
    { title: 'Users', value: '567', icon: faUser },
    { title: 'Settings', value: '89', icon: faCog },
    { title: 'Analytics', value: '90%', icon: faChartBar }
  ];
}
