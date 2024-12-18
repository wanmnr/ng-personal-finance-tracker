import { HttpClient } from "@angular/common/http";

// Define the interfaces
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  // Add other profile properties as needed
}

interface UserPreferences {
  theme: string;
  language: string;
  notifications: boolean;
  // Add other preference properties as needed
}

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
