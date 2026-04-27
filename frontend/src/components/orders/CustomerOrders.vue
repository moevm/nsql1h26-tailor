<script setup lang="ts">
import { ordersApi } from '@/api/orders';
import { useAuthStore } from '@/stores';
import type { Order, OrderFilters, OrderStatus } from '@/types';
import { ORDER_STATUS_LABELS } from '@/types/order';
import { PlusRound } from '@vicons/material';
import {
  NDataTable,
  NFlex,
  NFloatButton,
  NIcon,
  NInput,
  NSpin,
  NTag,
} from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { computed, h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import OrderFiltersPanel from './OrderFiltersPanel.vue';

const authStore = useAuthStore();
const router = useRouter();

const orders = ref<Order[]>([]);
const isLoading = ref(false);
const search = ref('');

onMounted(async () => {
  await loadOrders();
});

async function loadOrders(filters?: OrderFilters) {
  if (!authStore.user) return;
  isLoading.value = true;
  try {
    const res = await ordersApi.getByCustomer(authStore.user._id, filters);
    orders.value = res.data;
  } finally {
    isLoading.value = false;
  }
}

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

const filteredOrders = computed(() =>
  orders.value.filter((o) => o._id.includes(search.value.trim())),
);

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
      <order-filters-panel @change="loadOrders" />

      <n-input
        v-model:value="search"
        placeholder="Поиск"
        round
        clearable
        class="search"
      />

      <n-spin :show="isLoading">
        <n-data-table
          :columns="columns"
          :data="filteredOrders"
          :pagination="false"
          :bordered="true"
          size="small"
          :row-props="handleRowProps"
        />
      </n-spin>

      <n-float-button
        type="primary"
        :right="24"
        :bottom="24"
        @click="router.push('/orders/new')"
      >
        <n-icon>
          <PlusRound />
        </n-icon>
      </n-float-button>
    </n-flex>
  </div>
</template>

<style scoped lang="scss"></style>
