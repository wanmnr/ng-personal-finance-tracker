// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  login(credentials: any): Observable<any> {
    // Login implementation
    return new Observable();
  }

  logout(): Observable<any> {
    // Implement logout logic
    return of(null);
  }
}
