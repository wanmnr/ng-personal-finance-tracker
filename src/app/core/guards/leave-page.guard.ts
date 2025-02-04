/**
 * @file leave-page.guard.ts
 * @description Navigation guard that prevents accidental page exits when there are unsaved changes.
 * Implements a deactivation check with user confirmation dialog, requiring components to
 * implement ComponentCanDeactivate interface for determining dirty state.
 * @module Guard
 */

import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { DialogService } from '@core/services/dialog.service';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean;
}

export const leavePageGuard: CanDeactivateFn<ComponentCanDeactivate> = (
  component: ComponentCanDeactivate
) => {
  const dialogService = inject(DialogService);

  if (!component.canDeactivate()) {
    return dialogService.confirm('You have unsaved changes. Leave anyway?');
  }
  return true;
};
