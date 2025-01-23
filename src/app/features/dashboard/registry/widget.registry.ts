// widget.registry.ts
import { Type } from '@angular/core';
import { WidgetType } from '@features/dashboard/models/widget.model';

export class WidgetRegistry {
  private static readonly widgetMap = new Map<WidgetType, Type<any>>();
  private static readonly defaultSettingsMap = new Map<
    WidgetType,
    Record<string, any>
  >();

  static registerWidget(
    type: WidgetType,
    component: Type<any>,
    defaultSettings: Record<string, any>
  ) {
    this.widgetMap.set(type, component);
    this.defaultSettingsMap.set(type, defaultSettings);
  }

  static getComponent(type: WidgetType): Type<any> {
    const component = this.widgetMap.get(type);
    if (!component) {
      throw new Error(`No component registered for widget type: ${type}`);
    }
    return component;
  }

  static getComponents(): Type<any>[] {
    return Array.from(this.widgetMap.values());
  }

  static getDefaultSettings(type: WidgetType): Record<string, any> {
    const settings = this.defaultSettingsMap.get(type);
    if (!settings) {
      throw new Error(`No default settings for widget type: ${type}`);
    }
    return { ...settings };
  }
}
