/**
 * @file dynamic-sidebar.service.ts
 * @description Service managing the state and behavior of the dynamic sidebar
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Interface representing a navigation item in the sidebar
 * @interface NavigationItem
 */
export interface NavigationItem {
  /** Unique identifier for the item */
  id: number;
  /** Icon to display next to the item */
  icon: IconDefinition;
  /** Display text for the item */
  label: string;
  /** Router path for navigation */
  route: string;
  /** Whether the item is currently active */
  active: boolean;
  /** Optional CSS classes for the icon */
  iconClass?: string;
}

/**
 * Interface representing the state of the sidebar
 * @interface SidebarState
 */
export interface SidebarState {
  /** Current context of the sidebar */
  context: string;
  /** Navigation items to display */
  items: NavigationItem[];
  /** Whether the sidebar is currently open */
  isOpen: boolean;
}

/**
 * Service responsible for managing the sidebar state and operations
 * @class SidebarService
 */
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  /**
   * Initial state of the sidebar
   * @private
   * @readonly
   */
  private readonly INITIAL_STATE: SidebarState = {
    context: 'default',
    items: [],
    isOpen: true,
  };

  /**
   * BehaviorSubject holding the current state of the sidebar
   * @private
   * @readonly
   */
  private readonly _sidebarState = new BehaviorSubject<SidebarState>(this.INITIAL_STATE);

  /**
   * Observable stream of sidebar state changes
   * @public
   * @readonly
   */
  readonly sidebarState$: Observable<SidebarState> = this._sidebarState.asObservable();

  /**
   * Updates the context and navigation items of the sidebar
   * @param {string} context - The new context to set
   * @param {NavigationItem[]} items - The new navigation items to display
   */
  updateContext(context: string, items: NavigationItem[]): void {
    this._sidebarState.next({
      ...this._sidebarState.value,
      context,
      items,
    });
  }

  /**
   * Toggles the open/closed state of the sidebar
   */
  toggle(): void {
    this._sidebarState.next({
      ...this._sidebarState.value,
      isOpen: !this._sidebarState.value.isOpen,
    });
  }

  /**
   * Updates a specific navigation item's active state
   * @param {number} itemId - ID of the item to update
   * @param {boolean} active - New active state
   */
  setItemActive(itemId: number, active: boolean): void {
    const updatedItems = this._sidebarState.value.items.map(item => ({
      ...item,
      active: item.id === itemId ? active : false,
    }));

    this._sidebarState.next({
      ...this._sidebarState.value,
      items: updatedItems,
    });
  }

  /**
   * Updates the sidebar's open state
   * @param {boolean} isOpen - Whether the sidebar should be open
   */
  setOpenState(isOpen: boolean): void {
    this._sidebarState.next({
      ...this._sidebarState.value,
      isOpen,
    });
  }

  /**
   * Gets the current value of the sidebar state
   * @returns {SidebarState} Current sidebar state
   */
  getCurrentState(): SidebarState {
    return this._sidebarState.value;
  }

  /**
   * Resets the sidebar to its initial state
   */
  reset(): void {
    this._sidebarState.next(this.INITIAL_STATE);
  }
}
