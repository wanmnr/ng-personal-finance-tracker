// shared/services/chart.service.ts

import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private charts: Map<string, Chart> = new Map();

  createChart(
    canvas: HTMLCanvasElement,
    type: ChartType,
    data: any,
    options: ChartConfiguration['options'] = {}
  ): Chart {
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const chart = new Chart(canvas, {
      type,
      data,
      options: { ...defaultOptions, ...options },
    });

    return chart;
  }

  generateColors(count: number): string[] {
    return Array(count)
      .fill(0)
      .map((_, i) => `hsl(${(i * 360) / count}, 70%, 50%)`);
  }
}
