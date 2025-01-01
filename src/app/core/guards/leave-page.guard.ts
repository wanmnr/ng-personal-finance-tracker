// leave-page.guard.ts
import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { DialogService } from '../services/dialog.service';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean;
}

export const leavePageGuard: CanDeactivateFn<ComponentCanDeactivate> =
  (component: ComponentCanDeactivate) => {
    const dialogService = inject(DialogService);

    if (!component.canDeactivate()) {
      return dialogService.confirm('You have unsaved changes. Leave anyway?');
    }
    return true;
  };
