/**
 * @file leave-page.guard.ts
 * @description [brief description of the file's purpose]
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
