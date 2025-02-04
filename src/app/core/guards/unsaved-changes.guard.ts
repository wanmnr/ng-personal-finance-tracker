/**
 * @file unsaved-changes.guard.ts
 * @description Implements a navigation guard that protects against data loss by checking for unsaved changes
 * before allowing route deactivation. Components using this guard must implement the CanDeactivateComponent
 * interface. If unsaved changes exist, prompts user for confirmation before navigation.
 * @module Guard
 */

import { Injectable } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanDeactivateComponent {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<CanDeactivateComponent> = (
  component: CanDeactivateComponent
) => {
  if (component.canDeactivate()) {
    return true;
  }

  return confirm('You have unsaved changes. Do you really want to leave?');
};
