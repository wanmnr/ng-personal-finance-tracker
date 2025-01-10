// layout/dashboard10-sidenav/dashboard-sidenav.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavItem } from './nav-item.interface';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatDividerModule,
    FontAwesomeModule,
  ],
  template: `
    <mat-nav-list>
      <ng-container *ngFor="let item of navigationItems">
        <a
          mat-list-item
          [routerLink]="item.path"
          routerLinkActive="active-link"
          [attr.aria-label]="item.label"
        >
          <fa-icon [icon]="item.icon" class="mr-3"></fa-icon>
          {{ item.label }}
        </a>

        <mat-divider *ngIf="item.divider"></mat-divider>
      </ng-container>
    </mat-nav-list>
  `,
  styles: [
    `
      .active-link {
        @apply bg-primary/10;
      }
    `,
  ],
})
export class DashboardSidenavComponent {
  protected navigationItems: NavItem[];

  constructor(private authService: AuthService) {
    this.navigationItems = this.getNavigationItems();
  }

  private getNavigationItems(): NavItem[] {
    // Navigation items logic
  }
}
