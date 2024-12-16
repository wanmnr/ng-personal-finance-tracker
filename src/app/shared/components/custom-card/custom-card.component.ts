// shared/components/custom-card/custom-card.component.ts
// Basic
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface CardAction {
  label: string;
  icon?: any;
  handler: () => void;
  ariaLabel: string;
}

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card
      [ngClass]="containerClass"
      role="article"
      [attr.aria-label]="ariaLabel">

      <!-- Header Section -->
      <mat-card-header *ngIf="showHeader">
        <mat-card-title [id]="titleId">
          {{ title }}
        </mat-card-title>
        <mat-card-subtitle *ngIf="subtitle">
          {{ subtitle }}
        </mat-card-subtitle>
      </mat-card-header>

      <!-- Content Section -->
      <mat-card-content>
        <ng-content></ng-content>
      </mat-card-content>

      <!-- Actions Section -->
      <mat-card-actions *ngIf="actions?.length" align="end">
        <button
          mat-button
          *ngFor="let action of actions"
          (click)="action.handler()"
          [attr.aria-label]="action.ariaLabel">
          <fa-icon *ngIf="action.icon" [icon]="action.icon"></fa-icon>
          {{ action.label }}
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    /* Responsive Design */
    .card-container {
      @apply p-4 rounded-lg shadow-md transition-all duration-300;
    }

    /* Screen size utilities */
    @screen sm {
      .card-container {
        @apply p-6;
      }
    }

    @screen md {
      .card-container {
        @apply p-8;
      }
    }

    /* High Contrast Mode Support */
    @media (forced-colors: active) {
      .card-container {
        border: 1px solid currentColor;
      }
    }

    /* Focus Styles */
    :host:focus-within {
      @apply outline-none ring-2 ring-primary-500;
    }
  `]
})
export class CustomCardComponent implements OnInit {
  // Input Properties
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() showHeader = true;
  @Input() containerClass = '';
  @Input() ariaLabel = '';
  @Input() actions: CardAction[] = [];

  // Output Events
  @Output() cardClick = new EventEmitter<void>();

  // Public Properties
  titleId = `card-title-${Math.random().toString(36).substr(2, 9)}`;

  // Icons
  editIcon = faEdit;
  deleteIcon = faTrash;

  constructor() {}

  ngOnInit(): void {
    this.validateInputs();
  }

  private validateInputs(): void {
    if (!this.ariaLabel && this.title) {
      this.ariaLabel = this.title;
    }
  }
}
