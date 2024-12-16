// shared/components/custom-card/custom-card.constants.ts

export const CARD_DEFAULTS = {
  ELEVATION: 2,
  SIZE: 'md',
  THEME: 'light',
} as const;

export enum CardSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg'
}

export enum CardTheme {
  Light = 'light',
  Dark = 'dark'
}
