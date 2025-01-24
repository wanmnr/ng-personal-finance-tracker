// widget.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  WidgetConfig,
  WidgetType,
  WidgetData,
} from '@app/features/dashboard/dashboard-widget/widget.model';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private readonly http = inject(HttpClient);
  private readonly storageKey = 'dashboard-widgets-config';
  private widgetDataCache = new Map<WidgetType, BehaviorSubject<WidgetData>>();

  async loadWidgetConfiguration(): Promise<WidgetConfig[]> {
    const savedConfig = localStorage.getItem(this.storageKey);
    return savedConfig ? JSON.parse(savedConfig) : [];
  }

  async saveWidgetConfiguration(widgets: WidgetConfig[]): Promise<void> {
    localStorage.setItem(this.storageKey, JSON.stringify(widgets));
  }

  getWidgetData(type: WidgetType): Observable<WidgetData> {
    if (!this.widgetDataCache.has(type)) {
      this.widgetDataCache.set(
        type,
        new BehaviorSubject<WidgetData>({
          loading: true,
          data: null,
        })
      );
      this.fetchWidgetData(type);
    }
    return this.widgetDataCache.get(type)!.asObservable();
  }

  private async fetchWidgetData(type: WidgetType): Promise<void> {
    const subject = this.widgetDataCache.get(type)!;
    try {
      // Simulate API call - replace with actual endpoint
      const data = await this.http.get<any>(`/api/widgets/${type}`).toPromise();
      subject.next({ loading: false, data });
    } catch (error) {
      subject.next({
        loading: false,
        error: 'Failed to load widget data',
        data: null,
      });
    }
  }
}
