// @app/app/app5.component.ts
// Approach 6: Dynamic Layout with Configuration
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
// import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTableCells, faList, faTable } from '@fortawesome/free-solid-svg-icons';

interface LayoutConfig {
  columns: number;
  layout: 'grid' | 'list' | 'table';
  spacing: number;
  showSidebar: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatGridListModule, FontAwesomeModule],
  template: `
    <div class="min-h-screen">
      <!-- Layout Controls -->
      <div class="bg-white border-b p-4">
        <div class="flex space-x-4">
          <button *ngFor="let layout of layouts"
                  (click)="changeLayout(layout)"
                  [class.bg-blue-500]="currentLayout === layout"
                  class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <fa-icon [icon]="getLayoutIcon(layout)"
                    [class.text-white]="currentLayout === layout">
            </fa-icon>
          </button>
        </div>
      </div>

      <!-- Dynamic Content Area -->
      <div class="container mx-auto p-4">
        <div [ngSwitch]="config.layout">
          <!-- Grid Layout -->
          <div *ngSwitchCase="'grid'"
               [class]="'grid gap-' + config.spacing"
               [style.grid-template-columns]="'repeat(' + config.columns + ', minmax(0, 1fr))'">
            <ng-container *ngTemplateOutlet="contentTemplate">
            </ng-container>
          </div>

          <!-- List Layout -->
          <div *ngSwitchCase="'list'"
               [class]="'space-y-' + config.spacing">
            <ng-container *ngTemplateOutlet="contentTemplate">
            </ng-container>
          </div>

          <!-- Table Layout -->
          <div *ngSwitchCase="'table'"
               class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <ng-container *ngTemplateOutlet="contentTemplate">
              </ng-container>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Template -->
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class AppComponent implements OnInit {
  @Input() config: LayoutConfig = {
    columns: 3,
    layout: 'grid',
    spacing: 4,
    showSidebar: true
  };

  layouts: Array<'grid' | 'list' | 'table'> = ['grid', 'list', 'table'];
  currentLayout: 'grid' | 'list' | 'table' = 'grid';

  getLayoutIcon(layout: string): IconDefinition {
    const icons = {
      grid: faTableCells,
      list: faList,
      table: faTable
    };
    return icons[layout as keyof typeof icons];
  }

  changeLayout(layout: 'grid' | 'list' | 'table'): void {
    this.currentLayout = layout;
    this.config = { ...this.config, layout };
  }

  ngOnInit(): void {
    this.currentLayout = this.config.layout;
  }
}
