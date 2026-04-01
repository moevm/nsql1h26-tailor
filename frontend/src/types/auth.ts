/**
 * @file types/auth.ts
 * @description Типы для авторизации.
 * @module types/auth
 */

/**
 * Публичные данные пользователя.
 */
export interface User {
  /**
   * Уникальный идентификатор пользователя.
   */
  uuid: string;
  /**
   * Логин пользователя.
   */
  email: string;

  /**
   * Имя пользователя.
   */
  firstName: string;

  /**
   * Фамилия пользователя.
   */
  lastName: string;

  /**
   * Отчество пользователя (опционально).
   */
  patronymic?: string;

  /**
   * Телефон пользователя (опционально).
   */
  phone?: string;
}

/**
 * Данные для входа.
 */
export interface LoginCredentials {
  /**
   * Почта пользователя.
   */
  email: string;

  /**
   * Пароль пользователя.
   */
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
