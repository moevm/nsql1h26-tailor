import { authApi } from '@/api/auth';
import { type User } from '@/types';
import { type LoginCredentials } from '@/types/auth';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

/**
 * Store для управления авторизацией.
 */
export const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage<User | null>('authUser', null);
  const token = useLocalStorage<string | null>('accessToken', null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Флаг, указывающий, авторизован ли пользователь.
   */
  const isAuthenticated = computed(() => !!token.value);

  /**
   * Функция для входа пользователя.
   */
  async function login(credentials: LoginCredentials) {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await authApi.login(credentials);
      user.value = response.user;
      token.value = response.accessToken;
      return true;
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : 'Не удалось выполнить вход';
      clearAuth();
      error.value = message;
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Функция для выхода пользователя.
   */
  function logout() {
    clearAuth();
  }

  /**
   * Очистка данных авторизации.
   */
  function clearAuth() {
    user.value = null;
    token.value = null;
    error.value = null;
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    error,
    login,
    logout,
    clearAuth,
  };
});
