// layout/layout1/header.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule
  ],
  template: `
    <mat-toolbar
      role="banner"
      class="header-toolbar bg-primary text-white"
      aria-label="Main navigation">
      <button
        mat-icon-button
        (click)="menuToggled.emit()"
        aria-label="Toggle navigation menu"
        class="lg:hidden">
        <fa-icon [icon]="menuIcon" aria-hidden="true"></fa-icon>
      </button>
      <h1 class="text-xl font-bold ml-2">{{title}}</h1>
      <div class="flex-grow"></div>
      <button
        mat-icon-button
        (click)="themeToggled.emit()"
        aria-label="Toggle theme"
        class="theme-toggle">
        <mat-icon>{{isDarkTheme ? 'light_mode' : 'dark_mode'}}</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    :host {
      display: block;
    }

    .header-toolbar {
      @apply shadow-md z-10;
    }
  `]
})
export class HeaderComponent {
  @Input() title = 'Dashboard';
  @Input() isDarkTheme = false;
  @Output() menuToggled = new EventEmitter<void>();
  @Output() themeToggled = new EventEmitter<void>();

  menuIcon = faBars;
}
