<script setup lang="ts">
import { ordersApi } from '@/api/orders';
import { useAuthStore } from '@/stores';
import type { Order, OrderStatus } from '@/types';
import { ORDER_STATUS_LABELS } from '@/types/order';
import {
  NDataTable,
  NFlex,
  NInput,
  NSpin,
  NTabPane,
  NTabs,
  NTag,
} from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { computed, h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const allOrders = ref<Order[]>([]);
const myOrders = ref<Order[]>([]);
const isLoadingAll = ref(false);
const isLoadingMy = ref(false);
const searchAll = ref('');
const searchMy = ref('');
const activeTab = ref('all');

onMounted(async () => {
  await Promise.all([loadAllOrders(), loadMyOrders()]);
});

async function loadAllOrders() {
  isLoadingAll.value = true;
  try {
    const res = await ordersApi.getAll();
    allOrders.value = res.data;
  } finally {
    isLoadingAll.value = false;
  }
}

async function loadMyOrders() {
  if (!authStore.user) return;
  isLoadingMy.value = true;
  try {
    const res = await ordersApi.getByTailor(authStore.user._id);
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

const filteredAll = computed(() =>
  allOrders.value.filter((o) => o._id.includes(searchAll.value.trim())),
);

const filteredMy = computed(() =>
  myOrders.value.filter((o) => o._id.includes(searchMy.value.trim())),
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
          <n-input
            v-model:value="searchAll"
            placeholder="Поиск"
            round
            clearable
            class="search"
          />
          <n-spin :show="isLoadingAll">
            <n-data-table
              :columns="baseColumns"
              :data="filteredAll"
              :pagination="false"
              :bordered="true"
              size="small"
              :row-props="handleRowProps"
            />
          </n-spin>
        </n-flex>
      </n-tab-pane>

      <n-tab-pane name="my" tab="Мои заказы">
        <n-flex vertical>
          <n-input
            v-model:value="searchMy"
            placeholder="Поиск"
            round
            clearable
            class="search"
          />
          <n-spin :show="isLoadingMy">
            <n-data-table
              :columns="baseColumns"
              :data="filteredMy"
              :pagination="false"
              :bordered="true"
              size="small"
              :row-props="handleRowProps"
            />
          </n-spin>
        </n-flex>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
