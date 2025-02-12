/**
 * @file api.types.ts
 * @module core/types
 * @description Type definitions for API response handling
 *
 * @remarks
 * Provides a generic interface for standardizing HTTP API responses across the application.
 * Enforces a consistent response structure with data payload and status information.
 *
 * Features:
 * - Generic typing for response data
 * - Standardized status code inclusion
 * - Type-safe response handling
 *
 * @example
 * Basic usage with a User type:
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 * }
 *
 * const response: ApiResponse<User> = {
 *   data: { id: 1, name: "John" },
 *   status: 200
 * };
 * ```
 *
 * Usage with array responses:
 * ```typescript
 * const response: ApiResponse<User[]> = {
 *   data: [
 *     { id: 1, name: "John" },
 *     { id: 2, name: "Jane" }
 *   ],
 *   status: 200
 * };
 * ```
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
}
