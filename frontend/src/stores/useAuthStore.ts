/**
 * @file useAuthStore.ts
 * @description Pinia store для управления авторизацией.
 * @module useAuthStore
 * @author @KorzikAlex
 */
import { authApi } from '@/api/auth';
import type { RegisterCredentials, User } from '@/types';
import { useLocalStorage } from '@vueuse/core';
import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = useLocalStorage<string | null>('accessToken', null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  async function login(email: string, password: string) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await authApi.login({ email, password });
      token.value = data.accessToken;
      user.value = data.user;
    } catch (err) {
      error.value = extractMessage(err, 'Ошибка входа');
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(credentials: RegisterCredentials) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await authApi.register(credentials);
      token.value = data.accessToken;
      user.value = data.user;
    } catch (err) {
      error.value = extractMessage(err, 'Ошибка регистрации');
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function initAuth() {
    if (!token.value) return;
    try {
      const { data } = await authApi.getCurrentUser();
      user.value = data;
    } catch {
      clearAuth();
    }
  }

  async function logout() {
    clearAuth();
  }

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
    register,
    logout,
    clearAuth,
    initAuth,
  };
});

function extractMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    const msg = err.response?.data?.message;
    return Array.isArray(msg) ? msg[0] : (msg ?? fallback);
  }
  return fallback;
}
