/**
 * @file useAuthStore.ts
 * @description Pinia store для управления авторизацией.
 * @module useAuthStore
 * @author @KorzikAlex
 */
import { type SignInDto } from '@/api/schemas';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

/**
 * Store для управления авторизацией.
 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref<SignInDto>();
  const token = useLocalStorage<string>('accessToken', null);
  const isLoading = ref(false);
  const error = ref<string>();

  /**
   * Флаг, указывающий, авторизован ли пользователь.
   */
  const isAuthenticated = computed(() => !!token.value);

  /**
   * Функция для входа пользователя.
   */
  async function login() {
    isLoading.value = true;
    error.value = '';
  }

  /**
   * Функция для выхода пользователя.
   */
  async function logout() {
    clearAuth();
  }

  /**
   * Очистка данных авторизации.
   */
  function clearAuth() {
    user.value = undefined;
    token.value = null;
    error.value = '';
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
