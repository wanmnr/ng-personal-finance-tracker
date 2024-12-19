//Nested Configurable Sidebar with Breadcrumbs

// app/core/layout/sidebar/sidebar-config.model.ts
export interface SidebarItem {
  id: string;
  label: string;
  icon?: IconDefinition;
  route?: string;
  children?: SidebarItem[];
  permissions?: string[];
  badge?: {
    text: string;
    color: string;
  };
}

// app/core/layout/sidebar/sidebar.component.ts
import { Component, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nested-sidebar',
  standalone: true,
  imports: [
    MatSidenav,
    FontAwesomeModule
  ],
  template: `
    <mat-sidenav-container class="h-screen">
      <mat-sidenav #sidenav mode="side" opened
        class="w-64 bg-gray-800 text-white">

        <!-- Breadcrumb Navigation -->
        <div class="px-4 py-3 bg-gray-900">
          <div class="flex items-center space-x-2 text-sm">
            @for (item of currentBreadcrumb; track item.id; let last = $last) {
              <span class="flex items-center">
                @if (!last) {
                  <a [routerLink]="item.route"
                    class="text-gray-400 hover:text-white">
                    {{ item.label }}
                  </a>
                  <fa-icon [icon]="faChevronRight"
                    class="mx-2 text-gray-600 text-xs">
                  </fa-icon>
                } @else {
                  <span class="text-white">{{ item.label }}</span>
                }
              </span>
            }
          </div>
        </div>

        <!-- Nested Navigation -->
        <nav class="p-4">
          <ng-container *ngTemplateOutlet="menuTemplate;
            context: { $implicit: navigationItems }">
          </ng-container>

          <ng-template #menuTemplate let-items>
            <ul class="space-y-2">
              @for (item of items; track item.id) {
                <li>
                  <div class="relative">
                    <a [routerLink]="item.route"
                      class="flex items-center justify-between p-3
                      rounded-lg hover:bg-gray-700
                      transition-colors group">
                      <div class="flex items-center space-x-3">
                        @if (item.icon) {
                          <fa-icon [icon]="item.icon"
                            class="text-gray-400 group-hover:text-white">
                          </fa-icon>
                        }
                        <span>{{ item.label }}</span>
                      </div>

                      @if (item.badge) {
                        <span [class]="item.badge.color"
                          class="px-2 py-1 text-xs rounded-full">
                          {{ item.badge.text }}
                        </span>
                      }

                      @if (item.children?.length) {
                        <fa-icon [icon]="faChevronDown"
                          class="ml-2 text-gray-400 transform
                          transition-transform"
                          [class.rotate-180]="item.expanded">
                        </fa-icon>
                      }
                    </a>

                    @if (item.children?.length && item.expanded) {
                      <div class="mt-2 ml-6 border-l-2 border-gray-700">
                        <ng-container *ngTemplateOutlet="menuTemplate;
                          context: { $implicit: item.children }">
                        </ng-container>
                      </div>
                    }
                  </div>
                </li>
              }
            </ul>
          </ng-template>
        </nav>

      </mat-sidenav>

      <mat-sidenav-content class="p-6">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class NestedSidebarComponent {
  private router = inject(Router);
  currentBreadcrumb: SidebarItem[] = [];

  navigationItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: faHome,
      route: '/dashboard'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: faChartBar,
      children: [
        {
          id: 'reports',
          label: 'Reports',
          icon: faFileAlt,
          route: '/analytics/reports',
          badge: {
            text: 'New',
            color: 'bg-green-500'
          }
        },
        {
          id: 'metrics',
          label: 'Metrics',
          icon: faChartLine,
          route: '/analytics/metrics'
        }
      ]
    }
  ];

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumb();
    });
  }

  private updateBreadcrumb() {
    const currentPath = this.router.url;
    this.currentBreadcrumb = this.buildBreadcrumb(
      this.navigationItems,
      currentPath.split('/').filter(Boolean)
    );
  }

  private buildBreadcrumb(
    items: SidebarItem[],
    pathSegments: string[],
    result: SidebarItem[] = []
  ): SidebarItem[] {
    if (pathSegments.length === 0) return result;

    const currentSegment = pathSegments[0];
    const matchingItem = items.find(item =>
      item.route?.includes(currentSegment));

    if (matchingItem) {
      result.push(matchingItem);
      if (matchingItem.children && pathSegments.length > 1) {
        return this.buildBreadcrumb(
          matchingItem.children,
          pathSegments.slice(1),
          result
        );
      }
    }

    return result;
  }
}
