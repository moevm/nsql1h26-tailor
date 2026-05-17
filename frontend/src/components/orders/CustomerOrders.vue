<script setup lang="ts">
import { ordersApi } from '@/api/orders';
import { useAuthStore } from '@/stores';
import type { Order, OrderFilters, OrderTailor } from '@/types';
import { ORDER_STATUS_LABELS, statusTag } from '@/types/order';
import { PlusRound } from '@vicons/material';
import { NFloatButton, NIcon, NTag } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';
import { useRouter } from 'vue-router';
import OrdersTable from './OrdersTable.vue';

const authStore = useAuthStore();
const router = useRouter();

function getTailorFullName(tailorId: string | OrderTailor | null, status: string): string {
  if (status === 'created') return '-';
  if (!tailorId || typeof tailorId === 'string') return '-';
  return `${tailorId.name.firstName} ${tailorId.name.lastName}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU');
}

const columns: DataTableColumns<Order> = [
  {
    title: 'Заказ',
    key: '_id',
    render: (row) => `#${row._id.slice(-6).toUpperCase()}`,
  },
  {
    title: 'Тип заказа',
    key: 'orderType',
    render: (row) => row.items[0]?.name ?? '-',
  },
  {
    title: 'Статус',
    key: 'status',
    render: (row) =>
      h(NTag, { type: statusTag(row.status), size: 'small', round: true }, { default: () => ORDER_STATUS_LABELS[row.status] }),
  },
  {
    title: 'Работник',
    key: 'tailorId',
    render: (row) => getTailorFullName(row.tailorId, row.status),
  },
  {
    title: 'Дата создания',
    key: 'createdAt',
    render: (row) => formatDate(row.createdAt),
  },
  {
    title: 'Цена',
    key: 'totalPrice',
    render: (row) => `${row.totalPrice.toLocaleString('ru-RU')} ₽`,
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
