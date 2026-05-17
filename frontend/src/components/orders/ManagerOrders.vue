<script setup lang="ts">
import { ordersApi } from '@/api/orders';
import type { Order, OrderFilters, OrderTailor } from '@/types';
import { ORDER_STATUS_LABELS, statusTag } from '@/types/order';
import { NTag } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { h } from 'vue';
import OrdersTable from './OrdersTable.vue';

function getTailorName(tailorId: string | OrderTailor | null): string {
  if (!tailorId) return '-';
  if (typeof tailorId === 'string') return tailorId.slice(-6).toUpperCase();
  return tailorId.name.lastName;
}

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
  {
    title: 'Работник',
    key: 'tailorId',
    render: (row) => getTailorName(row.tailorId),
  },
  {
    title: 'Цена',
    key: 'totalPrice',
    render: (row) => String(row.totalPrice),
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
