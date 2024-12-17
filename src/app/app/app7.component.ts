// @app/app/app7.component.ts
// Approach 7: Performance-Optimized Layout
import {
  Component,
  ChangeDetectionStrategy,
  Signal,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChartLine,
  faUsers,
  faCog,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, FontAwesomeModule],
  template: `
    @if (isHandset()) {
      <div class="mobile-layout">
        <!-- Mobile Optimized Layout -->
        <header class="fixed top-0 w-full bg-white shadow-sm z-50">
          <nav class="flex items-center justify-between p-4">
            <button (click)="toggleMenu()"
                    class="text-gray-500 hover:text-gray-700">
              <fa-icon [icon]="menuIcon"></fa-icon>
            </button>
            <h1 class="text-lg font-semibold">{{ title() }}</h1>
          </nav>
        </header>

        <!-- Mobile Menu -->
        @if (isMenuOpen()) {
          <div class="fixed inset-0 bg-gray-800 bg-opacity-75 z-40"
               (click)="toggleMenu()">
            <div class="w-64 h-full bg-white"
                 (click)="$event.stopPropagation()">
              <nav class="py-4">
                @for (item of menuItems(); track item.id) {
                  <a [href]="item.route"
                     class="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                    <fa-icon [icon]="item.icon" class="mr-3"></fa-icon>
                    {{ item.label }}
                  </a>
                }
              </nav>
            </div>
          </div>
        }

        <!-- Mobile Content -->
        <main class="mt-16 p-4">
          <div class="grid grid-cols-1 gap-4">
            @for (widget of widgets(); track widget.id) {
              <div class="bg-white rounded-lg shadow p-4">
                <h2 class="text-lg font-semibold mb-2">{{ widget.title }}</h2>
                <p>{{ widget.content }}</p>
              </div>
            }
          </div>
        </main>
      </div>
    } @else {
      <!-- Desktop Layout -->
      <div class="flex h-screen">
        <!-- Sidebar -->
        <aside class="w-64 bg-white border-r">
          <nav class="p-4">
            @for (item of menuItems(); track item.id) {
              <a [href]="item.route"
                 class="flex items-center px-4 py-2 text-gray-600
                        hover:bg-gray-100 rounded-lg mb-1">
                <fa-icon [icon]="item.icon" class="mr-3"></fa-icon>
                {{ item.label }}
              </a>
            }
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-auto bg-gray-100">
          <div class="p-6">
            <h1 class="text-2xl font-semibold mb-6">{{ title() }}</h1>
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              @for (widget of widgets(); track widget.id) {
                <div class="bg-white rounded-lg shadow p-6">
                  <h2 class="text-lg font-semibold mb-3">{{ widget.title }}</h2>
                  <p>{{ widget.content }}</p>
                </div>
              }
            </div>
          </div>
        </main>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private breakpointObserver = inject(BreakpointObserver);
  menuIcon = faBars;

  // Signals
  isHandset: Signal<boolean> = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(map(result => result.matches)),
    { initialValue: false }
  );

  menuItems = computed(() => [
    { id: 1, label: 'Dashboard', icon: faChartLine, route: '/dashboard' },
    { id: 2, label: 'Users', icon: faUsers, route: '/users' },
    { id: 3, label: 'Settings', icon: faCog, route: '/settings' }
  ]);

  widgets = computed(() => [
    {
      id: 1,
      title: 'Performance',
      content: 'System performance metrics...'
    },
    {
      id: 2,
      title: 'Users',
      content: 'Active user statistics...'
    },
    {
      id: 3,
      title: 'Analytics',
      content: 'Recent analytics data...'
    }
  ]);

  title = computed(() => 'Dashboard');
  isMenuOpen = signal(false);

  // Methods
  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  constructor() {
    // Setup effects for layout changes
    effect(() => {
      if (!this.isHandset()) {
        this.isMenuOpen.set(false);
      }
    });
  }
}
