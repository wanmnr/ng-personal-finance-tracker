// panel/panel-container/panel-container.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PanelActions from '@shared/store/actions/panel.actions';
import { PanelComponent } from '@shared/components/panel/panel.component';

/**
 * Smart container component that manages panel state and data fetching
 */
@Component({
  selector: 'app-panel-container',
  standalone: true,
  imports: [PanelComponent],
  template: `
    <app-panel
      [allowMultiple]="true"
      (panelToggled)="onPanelToggled($event)">
    </app-panel>
  `
})
export class PanelContainerComponent implements OnInit {
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(PanelActions.loadPanels());
  }

  /**
   * Handles panel toggle events from the presentation component
   * @param id - Panel ID
   */
  onPanelToggled(id: string): void {
    // Additional container-level logic can be implemented here
    console.log(`Panel ${id} was toggled`);
  }
}
