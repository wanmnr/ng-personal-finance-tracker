// app/core/layout/main/main.component.ts
// Configurable Layout with DI Token
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DEFAULT_LAYOUT_CONFIG, LAYOUT_CONFIG, LayoutConfig } from '../config/layout5.config';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule,
    FontAwesomeModule
  ],
  template: `
    <div class="flex flex-col h-screen"
      [style.--header-height]="config.headerHeight">

      <app-header class="z-50"
        [style.height]="config.headerHeight">
        <button class="ml-4" (click)="toggleSidenav()">
          <fa-icon [icon]="isExpanded ? faTimes : faBars">
          </fa-icon>
        </button>
      </app-header>

      <mat-sidenav-container class="flex-1">
        <mat-sidenav
          #sidenav
          [mode]="config.sidenavMode"
          [opened]="isExpanded"
          [style.width]="config.sidenavWidth"
          [ngClass]="{'transition-all duration-300': config.enableAnimation}"
          class="border-r border-gray-200">
          <app-sidebar></app-sidebar>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="grid grid-cols-12 gap-4 p-6 min-h-full bg-gray-50">
            <div
              [class]="isExpanded ? 'col-span-12' : 'col-span-10 col-start-2'">
              <router-outlet></router-outlet>
            </div>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    .mat-sidenav-container {
      height: calc(100vh - var(--header-height));
    }

    .mat-sidenav-content {
      transition: margin-left 0.3s ease-in-out;
    }
  `]
})
export class MainComponent {
  protected config = inject(LAYOUT_CONFIG, { optional: true }) ?? DEFAULT_LAYOUT_CONFIG;

  isExpanded = this.config.defaultExpanded;
  faBars = faBars;
  faTimes = faTimes;

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }
}
