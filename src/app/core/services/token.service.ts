/**
 * @file token.service.ts
 * @module Core/Services/Auth
 * @description Manages authentication token storage and retrieval operations
 *
 * @remarks
 * This service handles:
 * - Secure token management in localStorage
 * - Token presence verification
 * - Root-level singleton instance
 *
 * Security considerations:
 * - Tokens stored in localStorage are accessible via JavaScript
 * - Should be used in conjunction with secure HTTP-only cookies for sensitive operations
 * - Clear tokens on logout or session expiration
 *
 * @example
 * Token management:
 * ```typescript
 * // Store token after login
 * tokenService.setToken('jwt_token_string');
 *
 * // Check token presence for protected routes
 * if (tokenService.hasToken()) {
 *   // Proceed with authenticated operation
 * }
 *
 * // Clear token on logout
 * tokenService.removeToken();
 * ```
 */

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  /**
   * Storage key for the authentication token
   * @private
   * @readonly
   */
  private readonly TOKEN_KEY = 'token';

  /**
   * Retrieves the stored authentication token
   * @returns The stored token or null if not present
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Stores the authentication token
   * @param token The authentication token to store
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Removes the stored authentication token
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Checks if an authentication token exists
   * @returns True if a token is present, false otherwise
   */
  hasToken(): boolean {
    return !!this.getToken();
  }
}
