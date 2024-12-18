// src/app/core/services/api.service.ts
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private tokenService: TokenService) { }

  getEndpoint(path: string): string {
    return `${this.apiUrl}/${path}`;
  }

  getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    };
  }
}
