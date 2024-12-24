// tooltip.types.ts

/**
 * @description
 * Defines the possible positions for the tooltip
 */
export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

/**
 * @description
 * Defines the available themes for the tooltip
 */
export type TooltipTheme = 'light' | 'dark';

/**
 * @description
 * Configuration interface for tooltip
 */
export interface TooltipConfig {
  content: string;
  position: TooltipPosition;
  theme: TooltipTheme;
  showDelay: number;
  hideDelay: number;
  disabled: boolean;
}
