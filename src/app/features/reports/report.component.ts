// features/reports/report.component.ts

import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { ProgressService } from './progress.service';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';
import { ExpenseBreakdownComponent } from './expense-breakdown.component';
import { CategoryAnalysisComponent } from './category-analysis.component';
import { TrendChartComponent } from './trend-chart.component';


@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ProgressBarComponent,
    ExpenseBreakdownComponent,
    CategoryAnalysisComponent,
    TrendChartComponent,
  ],
  template: `
    <ng-container *ngIf="progress$ | async as progress">
      <app-progress-bar [stage]="progress.stage" [value]="progress.progress">
      </app-progress-bar>
    </ng-container>

    <ng-container *ngIf="reportData$ | async as report">
      <app-expense-breakdown [data]="report.expenses"></app-expense-breakdown>
      <app-category-analysis [data]="report.categories"></app-category-analysis>
      <app-trend-chart [data]="report.trends"></app-trend-chart>
    </ng-container>
  `,
})
export class ReportComponent {
  private progressService = inject(ProgressService);
  private route = inject(ActivatedRoute);

  progress$ = this.progressService.progress$;
  reportData$ = this.route.data.pipe(map((data) => data['reportData']));
}
