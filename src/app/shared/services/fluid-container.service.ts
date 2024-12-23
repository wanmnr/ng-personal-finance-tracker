// services/fluid-container.service.ts

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FluidContainerConfig, FluidContainerState } from '../types/fluid-container.types';
import * as FluidContainerActions from '../store/fluid-container.actions';

@Injectable({
  providedIn: 'root',
})
export class FluidContainerService {
  constructor(private store: Store<{ fluidContainer: FluidContainerState }>) { }

  /**
   * Updates the container configuration
   * @param config Partial configuration to update
   */
  updateConfig(config: Partial<FluidContainerConfig>): void {
    this.store.dispatch(FluidContainerActions.updateConfig({ config }));
  }

  /**
   * Gets the current container state
   * @returns Observable of FluidContainerState
   */
  getState(): Observable<FluidContainerState> {
    return this.store.select(state => state.fluidContainer);
  }

  /**
   * Sets the loading state
   * @param isLoading Loading state
   */
  setLoading(isLoading: boolean): void {
    this.store.dispatch(FluidContainerActions.setLoading({ isLoading }));
  }

  /**
   * Sets the error state
   * @param error Error message
   */
  setError(error: string | null): void {
    this.store.dispatch(FluidContainerActions.setError({ error }));
  }
}
