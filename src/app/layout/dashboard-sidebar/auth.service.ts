// core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  private userPermissions = new BehaviorSubject<string[]>([]);
  userPermissions$ = this.userPermissions.asObservable();

  hasPermission(permission: string): boolean {
    return this.userPermissions.value.includes(permission);
  }

  setAuthenticated(status: boolean): void {
    this.isAuthenticated.next(status);
  }

  setPermissions(permissions: string[]): void {
    this.userPermissions.next(permissions);
  }
}
