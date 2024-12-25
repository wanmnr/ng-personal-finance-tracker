// components/panel/panel.component.ts
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PanelItem } from '@shared/types/panel.interface';
import * as PanelActions from '@shared/store/actions/panel.actions';
import * as PanelSelectors from '@shared/store/selectors/panel.selectors';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

/**
 * Reusable panel component that handles expandable content sections
 */
@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    FontAwesomeModule
  ],
  template: `
    <div class="panel-container" role="region" [attr.aria-label]="'Panel Section'">
      <mat-spinner *ngIf="loading$ | async"
                   diameter="40"
                   class="mx-auto my-4">
      </mat-spinner>

      <div *ngIf="error$ | async as error"
           class="text-red-600 p-4 rounded bg-red-100 mb-4"
           role="alert">
        {{ error }}
      </div>

      <mat-accordion class="w-full"
                    [multi]="allowMultiple">
        <mat-expansion-panel *ngFor="let item of items$ | async"
                            [expanded]="item.isExpanded"
                            (opened)="onTogglePanel(item.id)"
                            class="mb-2 shadow-sm">
          <mat-expansion-panel-header class="flex items-center">
            <div class="flex items-center justify-between w-full">
              <span class="font-medium text-gray-800">{{ item.title }}</span>
              <fa-icon [icon]="item.isExpanded ? faChevronUp : faChevronDown"
                      class="text-gray-600">
              </fa-icon>
            </div>
          </mat-expansion-panel-header>

          <div class="panel-content py-4">
            {{ item.content }}
          </div>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .panel-container {
      @apply max-w-4xl mx-auto p-4;
    }

    .panel-content {
      @apply text-gray-700 leading-relaxed;
    }

    @media (max-width: 640px) {
      .panel-container {
        @apply p-2;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent {
  /**
   * Allows multiple panels to be expanded simultaneously
   */
  @Input() allowMultiple = false;

  /**
   * Emits when a panel is toggled
   */
  @Output() panelToggled = new EventEmitter<string>();

  // FontAwesome icons
  protected readonly faChevronDown = faChevronDown;
  protected readonly faChevronUp = faChevronUp;

  // Store selectors
  items$: Observable<PanelItem[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.items$ = this.store.select(PanelSelectors.selectPanelItems);
    this.loading$ = this.store.select(PanelSelectors.selectPanelLoading);
    this.error$ = this.store.select(PanelSelectors.selectPanelError);
  }

  /**
   * Handles panel toggle events
   * @param id - Panel ID
   */
  onTogglePanel(id: string): void {
    this.store.dispatch(PanelActions.togglePanel({ id }));
    this.panelToggled.emit(id);
  }
}
