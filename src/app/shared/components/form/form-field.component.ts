/**
 * @file form-field.component.ts
 * @description Component for rendering dynamic form fields
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldConfig } from './form-field.config';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-field">
      <label [for]="field.name" class="form-label">
        {{ field.label }}
      </label>

      <ng-container [ngSwitch]="field.type">
        <!-- Text, Email, Password inputs -->
        <input
          *ngSwitchCase="'text'"
          [id]="field.name"
          [type]="field.type"
          [formControl]="control"
          class="form-input"
        />

        <input
          *ngSwitchCase="'email'"
          [id]="field.name"
          type="email"
          [formControl]="control"
          class="form-input"
        />

        <input
          *ngSwitchCase="'password'"
          [id]="field.name"
          type="password"
          [formControl]="control"
          class="form-input"
        />

        <!-- Date input -->
        <input
          *ngSwitchCase="'date'"
          [id]="field.name"
          type="date"
          [formControl]="control"
          class="form-input"
        />

        <!-- Checkbox -->
        <div *ngSwitchCase="'checkbox'" class="checkbox-wrapper">
          <input [id]="field.name" type="checkbox" [formControl]="control" class="form-checkbox" />
          <span class="checkbox-label">{{ field.label }}</span>
        </div>

        <!-- Default case -->
        <input
          *ngSwitchDefault
          [id]="field.name"
          type="text"
          [formControl]="control"
          class="form-input"
        />
      </ng-container>

      <!-- Error messages -->
      <div *ngIf="control.invalid && control.touched" class="error-messages">
        <small *ngFor="let error of getErrorMessages()" class="error-message">
          {{ error }}
        </small>
      </div>
    </div>
  `,
  styles: [
    `
      .form-field {
        margin-bottom: 1rem;
      }

      .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      .form-input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 1rem;
      }

      .form-input:focus {
        outline: none;
        border-color: #3b82f6;
        ring: 2px;
        ring-color: #93c5fd;
      }

      .checkbox-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .form-checkbox {
        width: 1rem;
        height: 1rem;
      }

      .checkbox-label {
        font-size: 1rem;
      }

      .error-messages {
        margin-top: 0.5rem;
      }

      .error-message {
        display: block;
        color: #dc2626;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class FormFieldComponent {
  @Input() field!: FormFieldConfig;
  @Input() control!: FormControl;
  @Input() errorMessages: Record<string, string> = {};

  getErrorMessages(): string[] {
    if (!this.control || !this.control.errors || !this.control.touched) {
      return [];
    }

    return Object.keys(this.control.errors).map((key) => {
      return this.errorMessages[key] || `${this.field.label} has an error`;
    });
  }
}
