// @shared/services/modal.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Interface for modal configuration
 * @interface ModalConfig
 */
export interface ModalConfig {
  /** Title of the modal */
  title: string;
  /** Content/message to be displayed */
  content: string | null;
  /** Custom component to be rendered (if any) */
  component?: any;
  /** Modal size: 'sm' | 'md' | 'lg' | 'xl' | 'full' */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Additional data to be passed to the modal */
  data?: any;
  /** Whether modal can be closed by clicking outside */
  disableClose?: boolean;
  /** Custom CSS classes */
  customClass?: string;
}

/**
 * Service responsible for managing modal state and operations
 * @class ModalService
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  /** BehaviorSubject to track modal visibility */
  private isVisibleSubject = new BehaviorSubject<boolean>(false);

  /** BehaviorSubject to track modal configuration */
  private configSubject = new BehaviorSubject<ModalConfig | null>(null);

  /** Observable for modal visibility */
  readonly isVisible$: Observable<boolean> = this.isVisibleSubject.asObservable();

  /** Observable for modal configuration */
  readonly config$: Observable<ModalConfig | null> = this.configSubject.asObservable();

  /**
   * Opens the modal with specified configuration
   * @param config - Modal configuration
   */
  open(config: ModalConfig): void {
    this.configSubject.next(config);
    this.isVisibleSubject.next(true);
  }

  /**
   * Closes the modal
   */
  close(): void {
    this.isVisibleSubject.next(false);
    this.configSubject.next(null);
  }

  /**
   * Updates existing modal configuration
   * @param config - Partial modal configuration to update
   */
  updateConfig(config: Partial<ModalConfig>): void {
    const currentConfig = this.configSubject.value;
    if (currentConfig) {
      this.configSubject.next({ ...currentConfig, ...config });
    }
  }
}
