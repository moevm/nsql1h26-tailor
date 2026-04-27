import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '@/types';

import { api } from './index';

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),

  register: (credentials: RegisterCredentials) =>
    api.post<AuthResponse>('/auth/register', credentials),

  getCurrentUser: () => api.get<User>('/auth/user'),
};
