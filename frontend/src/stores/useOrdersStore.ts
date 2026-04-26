import { ordersApi } from '@/api/orders';
import type { Order } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useAuthStore } from './useAuthStore';

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchForCurrentUser() {
    const authStore = useAuthStore();
    const user = authStore.user;
    if (!user) return;

    isLoading.value = true;
    error.value = null;
    try {
      let res;
      if (user.role === 'customer') {
        res = await ordersApi.getByCustomer(user._id);
      } else if (user.role === 'manager') {
        res = await ordersApi.getAll();
      } else {
        res = await ordersApi.getAll();
      }
      orders.value = Array.isArray(res.data) ? res.data : [];
    } catch {
      error.value = 'Не удалось загрузить заказы';
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchByTailor(tailorId: string) {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await ordersApi.getByTailor(tailorId);
      orders.value = Array.isArray(res.data) ? res.data : [];
    } catch {
      error.value = 'Не удалось загрузить заказы';
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchUnassigned() {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await ordersApi.getUnassigned();
      orders.value = Array.isArray(res.data) ? res.data : [];
    } catch {
      error.value = 'Не удалось загрузить заказы';
    } finally {
      isLoading.value = false;
    }
  }

  return {
    orders,
    isLoading,
    error,
    fetchForCurrentUser,
    fetchByTailor,
    fetchUnassigned,
  };
});
