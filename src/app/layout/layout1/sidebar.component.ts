// layout/layout1/sidebar.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavItem } from './nav-item.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    FontAwesomeModule
  ],
  template: `
    <nav>
      <mat-nav-list>
        @for (item of navigationItems; track item.path) {
          <a
            mat-list-item
            [routerLink]="[item.path]"
            routerLinkActive="active-link"
            class="nav-item"
            [attr.aria-label]="item.label">
            <fa-icon
              [icon]="item.icon"
              class="mr-3"
              aria-hidden="true">
            </fa-icon>
            <span>{{item.label}}</span>
          </a>
        }
      </mat-nav-list>
    </nav>
  `,
  styles: [`
    .nav-item {
      @apply rounded-lg transition-colors duration-200;
      &:hover {
        @apply bg-primary/10;
      }
      &.active-link {
        @apply bg-primary text-white;
      }
    }
  `]
})
export class SidebarComponent {
  @Input() navigationItems: NavItem[] = [];
}
