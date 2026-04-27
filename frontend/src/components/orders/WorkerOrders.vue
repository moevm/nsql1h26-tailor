<script setup lang="ts">
import { SearchBar } from '@/components/inputs';
import { ordersApi } from '@/api/orders';
import { useAuthStore } from '@/stores';
import type { Order, OrderFilters, OrderStatus } from '@/types';
import { ORDER_STATUS_LABELS } from '@/types/order';
import {
  NDataTable,
  NFlex,
  NSpin,
  NTabPane,
  NTabs,
  NTag,
} from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { computed, h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import OrderFiltersPanel from './OrderFiltersPanel.vue';

const authStore = useAuthStore();
const router = useRouter();

const allOrders = ref<Order[]>([]);
const myOrders = ref<Order[]>([]);
const isLoadingAll = ref(false);
const isLoadingMy = ref(false);
const filteredAll = ref<Order[]>([]);
const filteredMy = ref<Order[]>([]);
const activeTab = ref('all');

onMounted(async () => {
  await Promise.all([loadAllOrders(), loadMyOrders()]);
});

async function loadAllOrders(filters?: OrderFilters) {
  isLoadingAll.value = true;
  try {
    const res = await ordersApi.getAll(filters);
    allOrders.value = res.data;
  } finally {
    isLoadingAll.value = false;
  }
}

async function loadMyOrders(filters?: OrderFilters) {
  if (!authStore.user) return;
  isLoadingMy.value = true;
  try {
    const res = await ordersApi.getByTailor(authStore.user._id, filters);
    myOrders.value = res.data;
  } finally {
    isLoadingMy.value = false;
  }
}

const statusTagType = (
  status: OrderStatus,
): 'default' | 'info' | 'warning' | 'success' | 'error' => {
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

const baseColumns: DataTableColumns<Order> = [
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

const myOrdersVisible = computed(() =>
  myOrders.value.filter((order) => order.status !== 'created'),
);

function handleRowProps(row: Order) {
  return {
    style: 'cursor: pointer',
    onClick: () => router.push(`/orders/${row._id}`),
  };
}
</script>

<template>
  <div class="orders-page">
    <n-tabs v-model:value="activeTab" type="line" animated>
      <n-tab-pane name="all" tab="Все заказы">
        <n-flex vertical :size="16">
          <order-filters-panel @change="loadAllOrders" />
          <SearchBar v-model:filtered="filteredAll" :items="allOrders" />
          <n-spin :show="isLoadingAll">
            <n-data-table :columns="baseColumns" :data="filteredAll" :pagination="false" :bordered="true" size="small"
              :row-props="handleRowProps" />
          </n-spin>
        </n-flex>
      </n-tab-pane>

      <n-tab-pane name="my" tab="Мои заказы">
        <n-flex vertical :size="16">
          <order-filters-panel @change="loadMyOrders" />
          <SearchBar v-model:filtered="filteredMy" :items="myOrdersVisible" />
          <n-spin :show="isLoadingMy">
            <n-data-table :columns="baseColumns" :data="filteredMy" :pagination="false" :bordered="true" size="small"
              :row-props="handleRowProps" />
          </n-spin>
        </n-flex>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
