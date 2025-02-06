/**
 * @file api.service.ts
 * @description Core API configuration service for HTTP requests
 * @module Service
 *
 * @remarks
 * Centralizes API endpoint construction and authorization header management.
 * Works in conjunction with TokenService for authentication.
 *
 * @usageNotes
 * Inject this service to obtain configured endpoints and headers for API calls
 */

import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private tokenService: TokenService) {}

  getEndpoint(path: string): string {
    return `${this.apiUrl}/${path}`;
  }

  getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    };
  }
}
