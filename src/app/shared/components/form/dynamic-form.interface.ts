/**
 * @file dynamic-form.interface.ts
 * @module shared/form
 * @description Defines core interfaces and types for dynamic form generation and configuration
 *
 * @remarks
 * This module provides a comprehensive type system for building dynamic forms with the following features:
 * - Flexible field type support
 * - Built-in validation integration
 * - Customizable layout options
 * - Extensive styling capabilities
 * - Form action configuration
 *
 * Required imports:
 * - @angular/forms (for ValidatorFn)
 *
 * @example
 * Basic form configuration:
 * ```typescript
 * const loginForm: IFormConfig = {
 *   id: 'login-form',
 *   fields: [{
 *     key: 'email',
 *     type: 'email',
 *     label: 'Email Address',
 *     required: true,
 *     validators: [Validators.email]
 *   }],
 *   submitButton: { text: 'Login' },
 *   layout: 'column'
 * };
 * ```
 *
 * Advanced form with multiple field types:
 * ```typescript
 * const registrationForm: IFormConfig = {
 *   id: 'registration',
 *   fields: [{
 *     key: 'userType',
 *     type: 'select',
 *     label: 'User Type',
 *     options: [
 *       { value: 'admin', label: 'Administrator' },
 *       { value: 'user', label: 'Regular User' }
 *     ],
 *     errorMessages: {
 *       required: 'Please select a user type'
 *     }
 *   }],
 *   submitButton: {
 *     text: 'Register',
 *     className: 'primary-button'
 *   },
 *   cancelButton: {
 *     text: 'Cancel',
 *     className: 'secondary-button'
 *   },
 *   layout: 'row'
 * };
 * ```
 */

import { ValidatorFn } from '@angular/forms';

/**
 * Defines the structure for individual form field configuration
 *
 * @interface IFormField
 * @property {string} key - Unique identifier for the form control
 * @property {FormFieldType} type - Type of form field
 * @property {string} label - Display label for the field
 * @property {string} [placeholder] - Placeholder text for input fields
 * @property {boolean} [required] - Whether the field is required
 * @property {boolean} [disabled] - Whether the field is disabled
 * @property {ValidatorFn[]} [validators] - Angular form validators
 * @property {Object} [errorMessages] - Custom error messages for validation failures
 * @property {any} [defaultValue] - Initial value for the field
 * @property {SelectOption[]} [options] - Options for select/multiselect/radio fields
 * @property {string} [className] - Custom CSS classes
 */
interface IFormField {
  key: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  validators?: ValidatorFn[];
  errorMessages?: { [key: string]: string };
  defaultValue?: any;
  options?: SelectOption[];
  className?: string;
}

/**
 * Defines the overall form configuration structure
 *
 * @interface IFormConfig
 * @property {string} id - Unique identifier for the form
 * @property {IFormField[]} fields - Array of form field configurations
 * @property {Object} submitButton - Submit button configuration
 * @property {Object} [cancelButton] - Optional cancel button configuration
 * @property {'row' | 'column'} layout - Form layout direction
 * @property {string} [className] - Custom CSS classes for the form container
 */
interface IFormConfig {
  id: string;
  fields: IFormField[];
  submitButton: {
    text: string;
    color?: string;
    className?: string;
  };
  cancelButton?: {
    text: string;
    color?: string;
    className?: string;
  };
  layout: 'row' | 'column';
  className?: string;
}

/**
 * Supported form field types
 *
 * @type FormFieldType
 */
type FormFieldType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'datetime'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'hidden';

/**
 * Configuration for select/multiselect/radio options
 *
 * @interface SelectOption
 * @property {any} value - Option value
 * @property {string} label - Display text for the option
 * @property {boolean} [disabled] - Whether the option is disabled
 */
interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}
