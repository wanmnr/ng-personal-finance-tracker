// app/core/models/context6.types.ts

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface FilterOption {
  id: string;
  label: string;
  active: boolean;
}

export interface SortOption {
  id: string;
  label: string;
  direction: 'asc' | 'desc';
}

export interface ColumnOption {
  id: string;
  label: string;
  visible: boolean;
}

export interface ContextAction {
  id: string;
  label: string;
  icon: IconDefinition;
  disabled: boolean;
  execute: () => void;
}
