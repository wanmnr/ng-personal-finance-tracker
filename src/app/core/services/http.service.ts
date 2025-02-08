/**
 * @file http.service.ts
 * @module Core/Services/Http
 * @description Generic HTTP service that provides type-safe REST operations
 *
 * @remarks
 * This service wraps Angular's HttpClient to provide:
 * - Consistent default headers across requests
 * - Type-safe HTTP operations
 * - Centralized HTTP configuration
 *
 * @example
 * ```typescript
 * // Injecting and using the service
 * constructor(private httpService: HttpService) {}
 *
 * getUsers(): Observable<User[]> {
 *   return this.httpService.get<User[]>('/api/users');
 * }
 * ```
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  /**
   * Performs a typed HTTP GET request
   *
   * @typeParam T - The expected return type of the HTTP request
   * @param url - The endpoint URL for the GET request
   * @param options - Optional HTTP request configuration
   * @returns An Observable of type T containing the response
   */
  get<T>(url: string, options = {}): Observable<T> {
    return this.http.get<T>(url, {
      ...this.getDefaultOptions(),
      ...options
    });
  }

  /**
   * Provides default HTTP request options
   *
   * @internal
   * @returns Default HTTP options with JSON content type header
   */
  private getDefaultOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
