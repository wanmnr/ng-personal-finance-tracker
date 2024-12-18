// src/app/core/services/api.service.ts
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  getEndpoint(path: string): string {
    return `${this.apiUrl}/${path}`;
  }

  getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    };
  }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
