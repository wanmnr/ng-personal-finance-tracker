// shared/components/custom-card/custom-card.types.ts

export interface CardAction {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  hidden?: boolean;
  type?: 'primary' | 'secondary' | 'tertiary';
  ariaLabel?: string;  // Add this
  handler?: () => void;  // Add this
}

export interface CustomCardInputs {
  title: string;
  subtitle?: string;
  showHeader?: boolean;
  containerClass?: string;
  ariaLabel?: string;
  loading?: boolean;
  error?: string | null;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  elevation?: number;
  actions?: CardAction[];
}

export interface CustomCardOutputs {
  cardClick: void;
  actionTriggered: CardAction;
  error: string;
}
