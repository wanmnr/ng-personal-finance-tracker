// features/reports/components/trend-chart/trend-chart.component.ts

import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Chart } from 'chart.js/auto';

interface TrendData {
  date: Date;
  amount: number;
}

@Component({
  selector: 'app-trend-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="trend-chart">
      <mat-card-header>
        <mat-card-title>Expense Trends</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <canvas #chartCanvas>
        </canvas>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .trend-chart {
        margin: 1rem;
      }
      mat-card-content {
        height: 300px;
      }
    `,
  ],
})
export class TrendChartComponent implements OnChanges {
  @Input() data: TrendData[] = [];
  private chart?: Chart;

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.updateChartData();
    }
  }

  private createChart(): void {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.data.map((item) => new Date(item.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Expenses',
            data: this.data.map((item) => item.amount),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  private updateChartData(): void {
    if (!this.chart) return;

    this.chart.data = {
      labels: this.data.map((item) => new Date(item.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Expenses',
          data: this.data.map((item) => item.amount),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
    this.chart.update();
  }
}
