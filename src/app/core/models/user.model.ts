// core/models/user.model.ts
export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  roles: string[];
  phone?: string;
  address?: string;
}
