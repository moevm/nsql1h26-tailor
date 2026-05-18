<script setup lang="ts">
import { ordersApi } from '@/api/orders';
import type { Order, OrderCustomer, OrderFilters, OrderTailor } from '@/types';
import { ORDER_STATUS_LABELS, STATUS_ORDER, statusTag } from '@/types/order';
import { NTag } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import OrdersTable from './OrdersTable.vue';

function getTailorFullName(tailorId: string | OrderTailor | null): string {
  if (!tailorId || typeof tailorId === 'string') return '-';
  return `${tailorId.name.firstName} ${tailorId.name.lastName}`;
}

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
    sorter: (a, b) => a._id.slice(-6).localeCompare(b._id.slice(-6)),
    render: (row) => `#${row._id.slice(-6).toUpperCase()}`,
  },
  {
    title: 'Тип заказа',
    key: 'orderType',
    sorter: (a, b) =>
      (a.items[0]?.name ?? '').localeCompare(b.items[0]?.name ?? ''),
    render: (row) => row.items[0]?.name ?? '-',
  },
  {
    title: 'Статус',
    key: 'status',
    sorter: (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
    render: (row) =>
      h(
        NTag,
        { type: statusTag(row.status), size: 'small', round: true },
        { default: () => ORDER_STATUS_LABELS[row.status] },
      ),
  },
  {
    title: 'Покупатель',
    key: 'customerId',
    sorter: (a, b) =>
      getCustomerFullName(a.customerId).localeCompare(
        getCustomerFullName(b.customerId),
      ),
    render: (row) => getCustomerFullName(row.customerId),
  },
  {
    title: 'Работник',
    key: 'tailorId',
    sorter: (a, b) =>
      getTailorFullName(a.tailorId).localeCompare(
        getTailorFullName(b.tailorId),
      ),
    render: (row) => getTailorFullName(row.tailorId),
  },
  {
    title: 'Дата создания',
    key: 'createdAt',
    sorter: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    render: (row) => formatDate(row.createdAt),
  },
  {
    title: 'Цена',
    key: 'totalPrice',
    sorter: (a, b) => a.totalPrice - b.totalPrice,
    render: (row) => `${row.totalPrice.toLocaleString('ru-RU')} ₽`,
  },
];

async function load(filters?: OrderFilters): Promise<Order[]> {
  const res = await ordersApi.getAll(filters);
  return res.data;
}
</script>

<template>
  <OrdersTable :columns="columns" :load="load" />
</template>
