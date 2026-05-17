<script setup lang="ts">
import { ordersApi } from '@/api/orders';
import { useAuthStore } from '@/stores';
import type { Order, OrderFilters } from '@/types';
import { ORDER_STATUS_LABELS, statusTag } from '@/types/order';
import { PlusRound } from '@vicons/material';
import { NFloatButton, NIcon, NTag } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';
import { useRouter } from 'vue-router';
import OrdersTable from './OrdersTable.vue';

const authStore = useAuthStore();
const router = useRouter();

const columns: DataTableColumns<Order> = [
  {
    title: 'Заказ',
    key: '_id',
    render: (row) => `#${row._id.slice(-6).toUpperCase()}`,
  },
  {
    title: 'Статус',
    key: 'status',
    render: (row) =>
      h(NTag, { type: statusTag(row.status), size: 'small', round: true }, { default: () => ORDER_STATUS_LABELS[row.status] }),
  },
];

async function load(filters?: OrderFilters): Promise<Order[]> {
  if (!authStore.user) return [];
  const res = await ordersApi.getByCustomer(authStore.user._id, filters);
  return res.data;
}
</script>

<template>
  <OrdersTable :columns="columns" :load="load">
    <n-float-button type="primary" :right="24" :bottom="24" @click="router.push('/orders/new')">
      <n-icon><PlusRound /></n-icon>
    </n-float-button>
  </OrdersTable>
</template>
