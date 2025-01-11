// core/models/user-role.model.ts
export enum UserRole {
  FREE_USER = 'FREE_USER',
  PREMIUM_USER = 'PREMIUM_USER',
  ADMIN = 'ADMIN',
}

export interface UserPermissions {
  userId: string;
  role: UserRole;
  permissions: string[];
}
