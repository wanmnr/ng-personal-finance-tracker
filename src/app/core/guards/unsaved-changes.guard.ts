// core/guard/unsaved-changes.guard.ts

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
