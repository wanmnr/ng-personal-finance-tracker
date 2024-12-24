// store/effects/pagination.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { PaginationActions } from '../actions/pagination.actions';

@Injectable()
export class PaginationEffects {
  constructor(private actions$: Actions) { }

  // Example effect that could be added if needed
  /*
  updateUrl$ = createEffect(() => this.actions$.pipe(
    ofType(PaginationActions.setCurrentPage, PaginationActions.setPageSize),
    map(() => {
      // Update URL with new pagination params
      // Return new action if needed
    })
  ));
  */
}
