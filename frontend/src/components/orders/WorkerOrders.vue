<script setup lang="ts">
import { ordersApi } from '@/api/orders';
import { useAuthStore } from '@/stores';
import type { Order, OrderCustomer, OrderFilters } from '@/types';
import { ORDER_STATUS_LABELS, statusTag } from '@/types/order';
import { NTabPane, NTabs, NTag } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { h, ref } from 'vue';
import OrdersTable from './OrdersTable.vue';

const authStore = useAuthStore();
const activeTab = ref('all');

function getCustomerFullName(customerId: string | OrderCustomer): string {
  if (typeof customerId === 'string') return '-';
  return `${customerId.name.firstName} ${customerId.name.lastName}`;
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
    title: 'Покупатель',
    key: 'customerId',
    render: (row) => getCustomerFullName(row.customerId),
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

async function loadAll(filters?: OrderFilters): Promise<Order[]> {
  const res = await ordersApi.getAll(filters);
  return res.data;
}

async function loadMy(filters?: OrderFilters): Promise<Order[]> {
  if (!authStore.user) return [];
  const res = await ordersApi.getByTailor(authStore.user._id, filters);
  return res.data.filter((order) => order.status !== 'created');
}
</script>

<template>
  <n-tabs v-model:value="activeTab" type="line" animated>
    <n-tab-pane name="all" tab="Все заказы">
      <OrdersTable :columns="columns" :load="loadAll" />
    </n-tab-pane>
    <n-tab-pane name="my" tab="Мои заказы">
      <OrdersTable :columns="columns" :load="loadMy" />
    </n-tab-pane>
  </n-tabs>
</template>
