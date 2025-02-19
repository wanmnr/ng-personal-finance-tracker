/**
 * @file dynamic-form.component.ts
 * @module DynamicFormModule
 * @description Renders a dynamic form based on provided configuration inputs.
 */

import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldConfig } from './form-field.config';
import { FormFieldComponent } from './form-field.component';

/**
 * DynamicFormComponent renders a reactive form dynamically based on provided field configurations.
 */

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ng-container *ngFor="let field of fields">
        <app-form-field
          [field]="field"
          [control]="getFieldControl(field.name)"
          [errorMessages]="getErrorMessages(field.name)"
        ></app-form-field>
      </ng-container>
      <ng-content select="[formActions]"></ng-content>
    </form>
  `,
})
export class DynamicFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() fields: FormFieldConfig[] = [];
  @Input() validationMessages: Record<string, Record<string, string>> = {};
  @Output() submitted = new EventEmitter<any>();

  form!: FormGroup;

  ngOnInit() {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    const group: Record<string, any> = {};
    this.fields.forEach((field) => {
      group[field.name] = [field.defaultValue, field.validations];
    });
    return this.fb.group(group);
  }

  getFieldControl(fieldName: string): FormControl {
    return this.form.get(fieldName) as FormControl;
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

  getErrorMessages(fieldName: string): Record<string, string> {
    return this.validationMessages[fieldName] || {};
  }
}
