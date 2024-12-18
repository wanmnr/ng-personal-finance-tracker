import { HttpClient } from "@angular/common/http";

// user.service.ts
export class UserService {
  constructor(private http: HttpClient) { }

  getUserProfile(userId: string) {
    return this.http.get(`/api/users/${userId}`);
  }

  updateProfile(userId: string, data: UserProfile) {
    return this.http.put(`/api/users/${userId}`, data);
  }

  updatePreferences(preferences: UserPreferences) {
    return this.http.put('/api/users/preferences', preferences);
  }
}
