export type UserRole = 'ADMIN' | 'STAFF';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

