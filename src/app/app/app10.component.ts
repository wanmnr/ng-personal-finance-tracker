// app10.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardHeaderComponent } from '../layout/dashboard-header/dashboard10-header.component';
import { DashboardSidenavComponent } from '../layout/dashboard-sidebar/dashboard10-sidebar.component';
import { DashboardFooterComponent } from '../layout/dashboard-footer/dashboard10-footer.component';
import { BreadcrumbNavComponent } from '../layout/breadcrumb-nav/breadcrumb-nav.component';
import { SkipLinkComponent } from '../layout/skip-link/skip-link.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    DashboardFooterComponent,
    BreadcrumbNavComponent,
    SkipLinkComponent
  ],
  template: `
    <div class="dashboard-container h-screen flex flex-col" [attr.data-theme]="currentTheme">
      <app-skip-link></app-skip-link>

      <app-dashboard-header
        (toggleSidenav)="sidenav.toggle()"
        [isMobile]="isMobile">
      </app-dashboard-header>

      <app-breadcrumb-nav></app-breadcrumb-nav>

      <mat-sidenav-container class="flex-grow">
        <mat-sidenav
          #sidenav
          [mode]="isMobile ? 'over' : 'side'"
          [opened]="!isMobile"
          class="w-64"
          role="navigation">
          <app-dashboard-sidenav></app-dashboard-sidenav>
        </mat-sidenav>

        <mat-sidenav-content
          role="main"
          id="main-content"
          class="p-6 bg-background">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>

      <app-dashboard-footer></app-dashboard-footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    .dashboard-container {
      @apply bg-background text-on-background;
    }
  `]
})
export class AppComponent {
  protected currentTheme = 'light';
  protected isMobile = false;

  constructor() {
    // Layout and theme initialization logic
  }
}
