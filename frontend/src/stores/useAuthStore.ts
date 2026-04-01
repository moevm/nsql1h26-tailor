/**
 * @file useAuthStore.ts
 * @description Pinia store для управления авторизацией.
 * @module useAuthStore
 * @author @KorzikAlex
 */
import { type User } from '@/types';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

/**
 * Store для управления авторизацией.
 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
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
  async function login() {
    isLoading.value = true;
    error.value = null;
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
