// services/avatar.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { AvatarConfig } from '../types/avatar.types';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  constructor(private http: HttpClient) { }

  /**
   * Generates initials from a full name
   * @param fullName - The full name to generate initials from
   * @returns Generated initials
   */
  generateInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  /**
   * Validates image URL by attempting to load it
   * @param imageUrl - URL of the image to validate
   * @returns Observable indicating if the image is valid
   */
  validateImageUrl(imageUrl: string): Observable<boolean> {
    return this.http.get(imageUrl, { responseType: 'blob' }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Generates a random background color
   * @returns Hex color code
   */
  generateRandomBackground(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
