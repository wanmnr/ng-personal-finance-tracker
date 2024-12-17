// @app/app/app5.component.ts
// Approach 5: Content Projection Based Layout
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faColumns, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, FontAwesomeModule],
  template: `
    <div class="flex h-screen">
      <!-- Layout Container -->
      <div class="flex flex-col w-full">
        <!-- Header with Content Projection -->
        <header class="bg-white shadow-sm h-16">
          <ng-content select="[header]"></ng-content>
        </header>

        <!-- Main Content Area -->
        <div class="flex flex-1 overflow-hidden">
          <!-- Sidebar with Content Projection -->
          <aside class="w-64 bg-gray-800 hidden md:block">
            <ng-content select="[sidebar]"></ng-content>
          </aside>

          <!-- Main Content with Content Projection -->
          <main class="flex-1 overflow-auto bg-gray-100">
            <ng-content select="[main]"></ng-content>
          </main>

          <!-- Optional Right Sidebar -->
          <aside class="w-64 bg-white hidden lg:block border-l">
            <ng-content select="[rightSidebar]"></ng-content>
          </aside>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  faColumns = faColumns;
  faBars = faBars;
}
