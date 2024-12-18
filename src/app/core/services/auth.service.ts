// src/app/core/services/auth.service.ts
// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { TokenService } from './token.service';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RefreshTokenResponse {
  token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  // Add other registration fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private tokenService: TokenService
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      this.apiService.getEndpoint('auth/register'),
      credentials,
      { headers: this.apiService.getHeaders() }
    ).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
        this.handleAuthSuccess(response.user);
      }),
      catchError(this.handleError)
    );
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      this.apiService.getEndpoint('auth/login'),
      credentials,
      { headers: this.apiService.getHeaders() }
    ).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
        this.handleAuthSuccess(response.user);
      }),
      catchError(this.handleError)
    );
  }

  // login(credentials: any): Observable<any> {
  //   // Login implementation
  //   return new Observable();
  // }

  logout(): Observable<void> {
    return this.http.post<void>(
      this.apiService.getEndpoint('auth/logout'),
      {},
      { headers: this.apiService.getHeaders() }
    ).pipe(
      tap(() => {
        this.tokenService.removeToken();
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
      }),
      catchError(this.handleError)
    );
  }

  // logout(): Observable<any> {
  //   // Implement logout logic
  //   return of(null);
  // }

  isAuthenticated(): boolean {
    // return !!localStorage.getItem('token');
    return this.tokenService.hasToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // getCurrentUser(): Observable<any> {
  //   return this.currentUserSubject.asObservable();
  // }

  refreshToken(): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(
      this.apiService.getEndpoint('auth/refresh-token'),
      {},
      { headers: this.apiService.getHeaders() }
    ).pipe(
      tap(response => {
        if (response.token) {
          this.tokenService.setToken(response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  requestPasswordReset(email: string): Observable<void> {
    return this.http.post<void>(
      this.apiService.getEndpoint('auth/forgot-password'),
      { email },
      { headers: this.apiService.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>(
      this.apiService.getEndpoint('auth/reset-password'),
      { token, newPassword },
      { headers: this.apiService.getHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleAuthSuccess(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
