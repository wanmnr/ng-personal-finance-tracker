// features/reports/components/trend-chart/trend-chart.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from '@shared/components/base-chart/base-chart.component';

interface TrendData {
  date: Date;
  amount: number;
}

@Component({
  selector: 'app-trend-chart',
  standalone: true,
  imports: [CommonModule, BaseChartComponent],
  template: `
    <app-base-chart
      [title]="'Expense Trends'"
      [type]="'line'"
      [data]="chartData"
      [options]="chartOptions"
    >
    </app-base-chart>
  `,
})
export class TrendChartComponent {
  @Input() set data(value: TrendData[]) {
    this.updateChartData(value);
  }

  chartData: any = {
    labels: [],
    datasets: [],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  private updateChartData(data: TrendData[]): void {
    this.chartData = {
      labels: data.map((item) => new Date(item.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Expenses',
          data: data.map((item) => item.amount),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  }
}
