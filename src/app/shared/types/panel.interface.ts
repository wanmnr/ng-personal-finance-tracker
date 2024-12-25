// panel.interface.ts
/**
 * Represents the structure of a panel item
 * @interface PanelItem
 */
export interface PanelItem {
  id: string;
  title: string;
  content: string;
  icon?: string;
  isExpanded?: boolean;
  metadata?: Record<string, any>;
}

/**
 * Represents the panel state in the store
 * @interface PanelState
 */
export interface PanelState {
  items: PanelItem[];
  loading: boolean;
  error: string | null;
  selectedPanelId: string | null;
}
