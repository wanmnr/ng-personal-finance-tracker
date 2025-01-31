/**
 * @file category.model.ts
 * @description Type definitions for category data structures
 * @module Models
 */

export type CategoryName =
  | 'Housing'
  | 'Transportation'
  | 'Food'
  | 'Utilities'
  | 'Healthcare'
  | 'Entertainment'
  | 'Other';

export interface Category {
  id: string;
  name: CategoryName;
  color: string;
  icon?: string;
  description?: string;
}
