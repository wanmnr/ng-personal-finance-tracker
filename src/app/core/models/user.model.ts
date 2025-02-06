/**
 * @file user.model.ts
 * @description Core user data structures and profile interfaces
 * @module Model
 *
 * @remarks
 * Defines two user-related interfaces:
 * - User: Essential user identification and access data
 * - UserProfile: Extended user information with optional contact details
 */

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  roles: string[];
  phone?: string;
  address?: string;
}
