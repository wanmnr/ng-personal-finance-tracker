/**
 * @file storage.service.ts
 * @module Core/Services/Storage
 * @description Provides a wrapper service for browser's localStorage with type-safe operations
 *
 * @remarks
 * This service provides a typed interface for localStorage operations with:
 * - Type-safe data retrieval through generics
 * - Automatic JSON serialization/deserialization
 * - Global singleton instance (root-level injection)
 *
 * Usage constraints:
 * - Limited to JSON-serializable data types
 * - Storage capacity subject to browser limitations (~5-10MB)
 * - Data persistence tied to domain/origin
 *
 * @example
 * Basic storage operations:
 * ```typescript
 * // Store data
 * storageService.setItem('user', { id: 1, name: 'John' });
 *
 * // Retrieve typed data
 * interface User { id: number; name: string; }
 * const user = storageService.getItem<User>('user');
 *
 * // Remove specific item
 * storageService.removeItem('user');
 *
 * // Clear all stored data
 * storageService.clear();
 * ```
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Stores a value in localStorage with automatic JSON serialization
   * @param key Storage key identifier
   * @param value Any JSON-serializable value to store
   * @throws {TypeError} If value cannot be JSON serialized
   */
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieves and deserializes a value from localStorage with type safety
   * @param key Storage key identifier
   * @returns The deserialized value cast to type T, or null if key doesn't exist
   * @throws {SyntaxError} If stored value cannot be parsed as JSON
   */
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Removes a specific item from localStorage
   * @param key Storage key identifier to remove
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears all data from localStorage for current domain
   */
  clear(): void {
    localStorage.clear();
  }
}
