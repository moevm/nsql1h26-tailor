/**
 * @file types/auth.ts
 * @description Типы для авторизации.
 * @module types/auth
 */

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
  role: 'customer' | 'tailor' | 'manager';
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
