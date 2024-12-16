// shared/interfaces/card-config.interface.ts

// shared/interfaces/card-action.interface.ts
export interface CardAction {
  id: string;  // Add this required field
  label: string;
  icon?: any;
  handler?: () => void;
  ariaLabel: string;
}

export interface CardConfig {
  title: string;
  subtitle?: string;
  showHeader?: boolean;
  containerClass: string;
  ariaLabel?: string;
  actions?: CardAction[];
}
