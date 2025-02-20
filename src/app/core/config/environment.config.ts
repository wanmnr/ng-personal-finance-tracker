// src/app/core/config/environment.config.ts
import { InjectionToken } from '@angular/core';

export interface EnvironmentConfig {
  production: boolean;
  apiUrl: string;
  useMockData: boolean;
  allowedOrigins: string[];
}

export const ENVIRONMENT_CONFIG = new InjectionToken<EnvironmentConfig>('environment-config');

export const developmentConfig: EnvironmentConfig = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  useMockData: true,
  allowedOrigins: ['http://localhost:4200', 'http://localhost:3000'],
};

export const productionConfig: EnvironmentConfig = {
  production: true,
  apiUrl: 'https://api.yourproductionurl.com/api',
  useMockData: false,
  allowedOrigins: ['https://yourproductionurl.com'],
};
