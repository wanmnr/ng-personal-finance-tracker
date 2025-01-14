// shared/components/base-chart/base-chart.component.ts
// Implement Charts using chart.js/auto

import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
import { ChartService } from '@shared/services/chart.service';

@Component({
  selector: 'app-base-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="chart-container">
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <canvas #chartCanvas></canvas>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .chart-container {
        margin: 1rem;
      }
      mat-card-content {
        height: 300px;
      }
    `,
  ],
})
export class BaseChartComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() title: string = '';
  @Input() type: ChartType = 'line';
  @Input() data: any;
  @Input() options?: ChartConfiguration['options'];

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  constructor(private chartService: ChartService) {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {
    if (this.chart && this.data) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    if (!this.chartCanvas || !this.data) return;

    this.chart = this.chartService.createChart(
      this.chartCanvas.nativeElement,
      this.type,
      this.data,
      this.options
    );
  }

  private updateChart(): void {
    if (!this.chart) return;

    this.chart.data = this.data;
    this.chart.update();
  }
}
