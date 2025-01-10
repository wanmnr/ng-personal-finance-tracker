// layout/breadcrumb-nav/breadcrumb-nav.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav aria-label="Breadcrumb" class="breadcrumb-container">
      <ol class="flex text-sm">
        <li *ngFor="let crumb of breadcrumbs$ | async; let last = last">
          <a
            [routerLink]="crumb.path"
            [attr.aria-current]="last ? 'page' : null"
            class="breadcrumb-link"
          >
            {{ crumb.label }}
          </a>
          <span *ngIf="!last" class="mx-2">/</span>
        </li>
      </ol>
    </nav>
  `,
  styles: [
    `
      .breadcrumb-container {
        @apply bg-surface px-4 py-2 border-b border-outline;
      }

      .breadcrumb-link {
        @apply text-primary hover:underline;
      }
    `,
  ],
})
export class BreadcrumbNavComponent {
  protected breadcrumbs$;

  constructor(private readonly breadcrumbService: BreadcrumbService) {}

  protected breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
}
