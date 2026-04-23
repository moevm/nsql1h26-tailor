import { type AuthResponse, type LoginCredentials } from '@/types/auth';
import { isAxiosError } from 'axios';

import { apiClient } from './apiClient';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data } = await apiClient.post<AuthResponse>(
        '/auth/login',
        credentials,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          typeof error.response?.data?.message === 'string'
            ? error.response.data.message
            : 'Ошибка авторизации';
        throw new Error(message, { cause: error });
      }

      throw new Error('Ошибка сети при авторизации', { cause: error });
    }
  },
};
