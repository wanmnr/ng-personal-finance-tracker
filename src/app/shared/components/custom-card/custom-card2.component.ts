// shared/components/custom-card/custom-card2.component.ts

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  CardAction,
  CustomCardInputs,
  CustomCardOutputs,
} from './models/custom-card2.types';
import { CustomCardViewModel } from './models/custom-card2.view-model';
import { CARD_DEFAULTS } from './models/custom-card2.constants';

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
  ],
  providers: [CustomCardViewModel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('cardState', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(20px)',
        })
      ),
      transition('void => *', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ]),
    ]),
  ],
  template: `
    <mat-card
      [@cardState]
      [ngClass]="viewModel.containerClasses$ | async"
      [attr.data-size]="size"
      [attr.data-theme]="theme"
      [attr.data-elevation]="elevation"
      role="article"
      [attr.aria-label]="ariaLabel"
      [attr.aria-busy]="loading"
      [attr.aria-disabled]="loading"
    >
      <ng-container *ngIf="!(viewModel.state$ | async)?.loading">
        <ng-container *ngIf="!(viewModel.state$ | async)?.error">
          <!-- rest of your template -->
        </ng-container>
      </ng-container>

      <ng-container *ngIf="!loading && !error">
        <mat-card-header *ngIf="showHeader">
          <mat-card-title [id]="titleId">
            {{ title }}
          </mat-card-title>
          <mat-card-subtitle *ngIf="subtitle">
            {{ subtitle }}
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <ng-content></ng-content>
        </mat-card-content>

        <mat-card-actions *ngIf="actions?.length" align="end">
          <button
            mat-button
            *ngFor="let action of actions; trackBy: trackByFn"
            (click)="onActionTriggered(action)"
            [attr.aria-label]="action.ariaLabel"
            [disabled]="loading"
          >
            <fa-icon *ngIf="action.icon" [icon]="action.icon"></fa-icon>
            {{ action.label }}
          </button>
        </mat-card-actions>
      </ng-container>
    </mat-card>

    <ng-template #loadingTemplate>
      <div class="card-loading-overlay" aria-hidden="true">
        <mat-spinner diameter="24"></mat-spinner>
      </div>
    </ng-template>

    <ng-template #errorTemplate>
      <div class="card-error" role="alert">
        {{ error }}
      </div>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      /* Base Styles */
      .mat-mdc-card {
        @apply relative overflow-hidden transition-all duration-300;
      }

      /* Size Variants */
      .card-sm {
        @apply p-4 text-sm;
      }

      .card-md {
        @apply p-6 text-base;
      }

      .card-lg {
        @apply p-8 text-lg;
      }

      /* Theme Variants */
      .theme-light {
        @apply bg-white text-gray-900;
      }

      .theme-dark {
        @apply bg-gray-800 text-white;
      }

      /* Loading State */
      .card-loading-overlay {
        @apply absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm;
      }

      /* Error State */
      .card-error {
        @apply p-4 text-red-600 dark:text-red-400 text-center;
      }

      /* Interactive States */
      .mat-mdc-card:hover {
        @apply shadow-lg;
      }

      /* Accessibility */
      .mat-mdc-card:focus-within {
        @apply ring-2 ring-primary-500 ring-offset-2;
      }

      /* Motion Reduction */
      @media (prefers-reduced-motion: reduce) {
        .mat-mdc-card {
          @apply transition-none;
        }
      }

      /* High Contrast */
      @media (forced-colors: active) {
        .mat-mdc-card {
          border: 1px solid currentColor;
        }
      }
    `,
  ],
})
export class CustomCardComponent implements CustomCardInputs {
  private readonly _vm = inject(CustomCardViewModel);

  get viewModel(): CustomCardViewModel {
    return this._vm;
  }

  ngOnInit() {
    // Update view model state when inputs change
    this.viewModel.updateState({
      title: this.title,
      theme: this.theme,
      size: this.size,
      elevation: this.elevation,
      loading: this.loading,
      error: this.error
    });
  }

  // Required Inputs
  @Input({ required: true }) title!: string;

  // Optional Inputs with Defaults
  @Input() subtitle?: string;
  @Input() showHeader = true;
  @Input() containerClass: string = 'default-card-container';
  @Input() ariaLabel = '';
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() theme: CustomCardInputs['theme'] = CARD_DEFAULTS.THEME;
  @Input() size: CustomCardInputs['size'] = CARD_DEFAULTS.SIZE;
  @Input() elevation: number = CARD_DEFAULTS.ELEVATION;
  @Input() actions: CustomCardInputs['actions'] = [];

  // Outputs
  @Output() cardClick = new EventEmitter<void>();
  @Output() actionTriggered = new EventEmitter<CardAction>();
  @Output() errorChange = new EventEmitter<string>();

  protected titleId = `card-${crypto.randomUUID()}`;

  protected onActionTriggered(action: CardAction): void {
    if (this.loading) return;
    this.actionTriggered.emit(action);
    action.handler?.();
  }

  protected trackByFn(_: number, action: CardAction): string {
    return `${action.label}-${action.ariaLabel}`;
  }
}
