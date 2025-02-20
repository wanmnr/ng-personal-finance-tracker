/**
 * @file api.service.ts
 * @description Core API configuration service for HTTP requests
 * @module ApiService
 *
 * @remarks
 * Centralizes API endpoint construction and authorization header management.
 * Works in conjunction with TokenService for authentication.
 *
 * @usageNotes
 * **Basic Usage:**
 * 1. Inject `ApiService` where you need to build or manage API endpoints.
 * 2. Use `getEndpoint(path: string)` to construct properly formatted URLs:
 *    ```ts
 *    const usersEndpoint = this.apiService.getEndpoint('users');
 *    ```
 * 3. Call `getHeaders()` to retrieve default headers (includes auth tokens if available):
 *    ```ts
 *    const defaultHeaders = this.apiService.getHeaders();
 *    ```
 * 4. Combine them with Angular's `HttpClient` methods or custom wrappers:
 *    ```ts
 *    this.http.get<User[]>(usersEndpoint, { headers: defaultHeaders })
 *      .subscribe((users) => console.log(users));
 *    ```
 *
 * **Extending with Type-Safe Methods:**
 * If you prefer to keep your HTTP methods in the same service (instead of your components or feature services),
 * you can add type-safe convenience methods (shown below) in this service or another dedicated API service.
 * Uncomment or adapt the following methods as needed:
 * ```ts
 * get<T>(path: string) {
 *   return this.http.get<T>(
 *     this.getEndpoint(path),
 *     { headers: this.getHeaders() }
 *   );
 * }
 *
 * post<T>(path: string, body: unknown) {
 *   return this.http.post<T>(
 *     this.getEndpoint(path),
 *     body,
 *     { headers: this.getHeaders() }
 *   );
 * }
 * ```
 *
 * These methods can help centralize repetitive logic for most basic CRUD operations.
 */

import { inject, Injectable } from '@angular/core';
import {
  ENVIRONMENT_CONFIG,
  EnvironmentConfig,
} from '../config/environment.config';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly config = inject<EnvironmentConfig>(ENVIRONMENT_CONFIG);
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  /**
   * Constructs a properly formatted endpoint URL based on the current environment configuration.
   * @param path - A string that represents the API path (e.g., 'users', 'products/123').
   */
  getEndpoint(path: string): string {
    return `${this.config.apiUrl}/${path}`.replace(/\/+/g, '/');
  }

  /**
   * Retrieves common HTTP headers, including the Authorization header if a token is available.
   */
  getHeaders(): Record<string, string> {
    const token = this.tokenService.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  /**
   * GET request helper
   * @param path Resource path, appended to base API URL
   */
  public get<T>(path: string) {
    return this.http.get<T>(this.getEndpoint(path), {
      headers: this.getHeaders(),
    });
  }

  /**
   * POST request helper
   * @param path Resource path, appended to base API URL
   * @param body Request payload
   */
  public post<T>(path: string, body: unknown) {
    return this.http.post<T>(this.getEndpoint(path), body, {
      headers: this.getHeaders(),
    });
  }

  /**
   * PUT request helper
   * @param path Resource path, appended to base API URL
   * @param body Request payload
   */
  public put<T>(path: string, body: unknown) {
    return this.http.put<T>(this.getEndpoint(path), body, {
      headers: this.getHeaders(),
    });
  }

  /**
   * PATCH request helper
   * @param path Resource path, appended to base API URL
   * @param body Request payload
   */
  public patch<T>(path: string, body: unknown) {
    return this.http.patch<T>(this.getEndpoint(path), body, {
      headers: this.getHeaders(),
    });
  }

  /**
   * DELETE request helper
   * @param path Resource path, appended to base API URL
   */
  public delete<T>(path: string) {
    return this.http.delete<T>(this.getEndpoint(path), {
      headers: this.getHeaders(),
    });
  }

  /**
   * HEAD request helper (less common, optional)
   */
  public head<T>(path: string) {
    return this.http.head<T>(this.getEndpoint(path), {
      headers: this.getHeaders(),
    });
  }

  /**
   * OPTIONS request helper (less common, optional)
   */
  public options<T>(path: string) {
    return this.http.options<T>(this.getEndpoint(path), {
      headers: this.getHeaders(),
    });
  }
}
