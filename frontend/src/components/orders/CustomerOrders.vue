<script setup lang="ts">
import { SearchBar } from '@/components/inputs';
import { useAuthStore, useOrdersStore } from '@/stores';
import type { Order, OrderStatus } from '@/types';
import { ORDER_STATUS_LABELS } from '@/types/order';
import { PlusRound } from '@vicons/material';
import {
  NDataTable,
  NFlex,
  NFloatButton,
  NIcon,
  NSpin,
  NTag,
} from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const ordersStore = useOrdersStore();
const router = useRouter();

const filteredOrders = ref<Order[]>([]);

onMounted(async () => {
  if (authStore.user) {
    await ordersStore.fetchForCurrentUser();
  }
});

const statusTagType = (status: OrderStatus) => {
  const map: Record<
    OrderStatus,
    'default' | 'info' | 'warning' | 'success' | 'error'
  > = {
    created: 'default',
    accepted: 'info',
    in_progress: 'warning',
    done: 'success',
    cancelled: 'error',
  };
  return map[status];
};

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
      h(
        NTag,
        { type: statusTagType(row.status), size: 'small', round: true },
        {
          default: () => ORDER_STATUS_LABELS[row.status],
        },
      ),
  },
];

function handleRowProps(row: Order) {
  return {
    style: 'cursor: pointer',
    onClick: () => router.push(`/orders/${row._id}`),
  };
}
</script>

<template>
  <div class="orders-page">
    <n-flex vertical :size="16">
      <SearchBar v-model:filtered="filteredOrders" :items="ordersStore.orders" />

      <n-spin :show="ordersStore.isLoading">
        <n-data-table :columns="columns" :data="filteredOrders" :pagination="false" :bordered="true" size="small"
          :row-props="handleRowProps" />
      </n-spin>

      <n-float-button type="primary" :right="24" :bottom="24" @click="router.push('/orders/new')">
        <n-icon>
          <PlusRound />
        </n-icon>
      </n-float-button>
    </n-flex>
  </div>
</template>

<style scoped lang="scss"></style>
