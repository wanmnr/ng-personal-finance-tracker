// app/app/app11.component.ts
// Widget Layout Demo

import { Component } from '@angular/core';
import { DashboardComponent } from '@features/dashboard/dashboard-widget/dashboard-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  template: '<app-dashboard></app-dashboard>',
})
export class AppComponent {}
