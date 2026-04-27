export type Role = 'customer' | 'tailor' | 'manager';

export interface UserName {
  firstName: string;
  lastName: string;
  patronymic?: string;
}

export interface User {
  _id: string;
  email: string;
  name: UserName;
  phone?: string;
  role: Role;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  patronymic?: string;
  phone?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
