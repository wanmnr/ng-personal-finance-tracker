// features/reports/components/category-analysis/category-analysis.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from '@shared/components/base-chart/base-chart.component';
import { ChartService } from '@shared/services/chart.service';

interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

@Component({
  selector: 'app-category-analysis',
  standalone: true,
  imports: [CommonModule, BaseChartComponent],
  template: `
    <app-base-chart
      [title]="'Category Analysis'"
      [type]="'pie'"
      [data]="chartData"
      [options]="chartOptions"
    >
    </app-base-chart>
  `,
})
export class CategoryAnalysisComponent {
  @Input() set data(value: CategoryData[]) {
    this.updateChartData(value);
  }

  chartData: any = {
    labels: [],
    datasets: [],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(private chartService: ChartService) {}

  private updateChartData(data: CategoryData[]): void {
    this.chartData = {
      labels: data.map((item) => item.category),
      datasets: [
        {
          data: data.map((item) => item.amount),
          backgroundColor: this.chartService.generateColors(data.length),
        },
      ],
    };
  }
}
