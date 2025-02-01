/**
 * @file auth.types.ts
 * @description Type definitions for authentication-related interfaces including User, AuthState, and Credentials
 * @module AuthModule
 */

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
