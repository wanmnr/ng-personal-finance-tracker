// core/services/user.service.ts
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { UserProfile } from '@core/models/user.model';

interface UserPreferences {
  theme: string;
  language: string;
  notifications: boolean;
  // Add other preference properties as needed
}

// user.service.ts
export class UserService {
  constructor(private http: HttpClient) { }

  getUserProfile(userId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`/api/users/${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching user profile:', error);
        return throwError(() => error);
      })
    );
  }

  validateUserRole(userId: string, role: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/users/${userId}/validate-role/${role}`);
  }

  updateProfile(userId: string, data: UserProfile) {
    return this.http.put(`/api/users/${userId}`, data);
  }

  updatePreferences(preferences: UserPreferences) {
    return this.http.put('/api/users/preferences', preferences);
  }
}
