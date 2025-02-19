/**
 * @file form-field.config.ts
 * @module shared/form
 * @description Defines the configuration interface for dynamic form field generation
 *
 * @remarks
 * The FormFieldConfig interface provides a type-safe structure for configuring form fields
 * in dynamic form generation scenarios. It supports:
 * - Basic input types (text, email, password, date, checkbox)
 * - Custom validation rules
 * - Default value assignment
 * - Additional configuration options
 *
 * Key features:
 * - Type-safe field configuration
 * - Integration with Angular's ValidatorFn system
 * - Flexible options object for extended configurations
 *
 * @example
 * Basic text field:
 * ```typescript
 * const textFieldConfig: FormFieldConfig = {
 *   name: 'firstName',
 *   type: 'text',
 *   label: 'First Name'
 * };
 * ```
 *
 * Field with validations:
 * ```typescript
 * const emailFieldConfig: FormFieldConfig = {
 *   name: 'email',
 *   type: 'email',
 *   label: 'Email Address',
 *   validations: [Validators.required, Validators.email],
 *   defaultValue: ''
 * };
 * ```
 *
 * Checkbox with options:
 * ```typescript
 * const checkboxConfig: FormFieldConfig = {
 *   name: 'subscribe',
 *   type: 'checkbox',
 *   label: 'Subscribe to newsletter',
 *   defaultValue: false,
 *   options: {
 *     description: 'Receive weekly updates'
 *   }
 * };
 * ```
 */

import { ValidatorFn, Validators } from '@angular/forms';

/**
 * Configuration interface for dynamic form field generation
 *
 * @interface FormFieldConfig
 * @property {string} name - Unique identifier for the form field
 * @property {'text' | 'email' | 'password' | 'date' | 'checkbox'} type - Input field type
 * @property {string} label - Display label for the form field
 * @property {ValidatorFn[]} [validations] - Array of Angular validator functions
 * @property {any} [defaultValue] - Initial value for the form field
 * @property {any} [options] - Additional configuration options for the field
 */
export interface FormFieldConfig {
  name: string;
  type: 'text' | 'email' | 'password' | 'date' | 'checkbox';
  label: string;
  validations?: ValidatorFn[];
  defaultValue?: any;
  options?: any;
}

const fields: FormFieldConfig[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    validations: [Validators.required, Validators.email],
    defaultValue: ''
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    validations: [Validators.required, Validators.minLength(8)],
    defaultValue: ''
  }
];

const validationMessages = {
  email: {
    required: 'Email is required',
    email: 'Please enter a valid email'
  },
  password: {
    required: 'Password is required',
    minlength: 'Password must be at least 8 characters'
  }
};
