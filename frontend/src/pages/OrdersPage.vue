<script setup lang="ts">
import CustomerOrders from '@/components/orders/CustomerOrders.vue';
import ManagerOrders from '@/components/orders/ManagerOrders.vue';
import WorkerOrders from '@/components/orders/WorkerOrders.vue';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
  <CustomerOrders v-if="authStore.user?.role === 'customer'" />
  <WorkerOrders v-else-if="authStore.user?.role === 'tailor'" />
  <ManagerOrders v-else-if="authStore.user?.role === 'manager'" />
  <div v-else style="text-align: center; margin-top: 80px; color: #999">
    Загрузка...
  </div>
</template>
