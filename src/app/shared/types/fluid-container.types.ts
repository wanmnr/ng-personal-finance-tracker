// types/fluid-container.types.ts

/**
 * Defines the configuration options for the fluid container
 * @interface FluidContainerConfig
 */
export interface FluidContainerConfig {
  /** Maximum width of the container */
  maxWidth?: string;
  /** Minimum width of the container */
  minWidth?: string;
  /** Padding for the container */
  padding?: string;
  /** Custom class names */
  customClass?: string;
  /** Whether the container should be full width */
  isFullWidth?: boolean;
}

/**
 * Defines the state of the fluid container
 * @interface FluidContainerState
 */
export interface FluidContainerState {
  /** Current configuration */
  config: FluidContainerConfig;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: string | null;
}
