interface UserName {
  firstName: string;
  lastName: string;
  patronymic?: string;
}

export type role = 'customer' | 'tailor' | 'manager';

/**
 * Публичные данные пользователя.
 */
export interface User {
  _id: string;
  email: string;
  name: UserName;
  phone?: string;
  role: role;
}

/**
 * Данные для входа.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Ответ от сервера при авторизации.
 */
export interface AuthResponse {
  /**
   * JWT токен доступа.
   */
  accessToken: string;
  /**
   * Данные пользователя.
   */
  user: User;
}
