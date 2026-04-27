<script setup lang="ts">
import { ordersApi } from '@/api/orders';
import ManagerAnalytics from '@/components/analytics/ManagerAnalytics.vue';
import type { Order, OrderStatus, OrderTailor } from '@/types';
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

const router = useRouter();

const orders = ref<Order[]>([]);
const isLoading = ref(false);
const search = ref('');
const activeTab = ref('orders');

onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await ordersApi.getAll();
    orders.value = res.data;
  } finally {
    isLoading.value = false;
  }
});

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

function getTailorName(tailorId: string | OrderTailor | null): string {
  if (!tailorId) return '-';
  if (typeof tailorId === 'string') return tailorId.slice(-6).toUpperCase();
  return `${tailorId.name.lastName}`;
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
      h(
        NTag,
        { type: statusTagType(row.status), size: 'small', round: true },
        {
          default: () => ORDER_STATUS_LABELS[row.status],
        },
      ),
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

const filteredOrders = computed(() =>
  orders.value.filter((o) => o._id.includes(search.value.trim())),
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
      <n-tab-pane name="orders" tab="Заказы">
        <h1 class="title"><em>Заказы</em></h1>
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
      </n-tab-pane>

      <n-tab-pane name="analytics" tab="Аналитика">
        <ManagerAnalytics />
      </n-tab-pane>

      <n-tab-pane name="import" tab="Импорт">
        <n-flex
          justify="center"
          align="center"
          style="height: 200px; color: #999"
        >
          Импорт
        </n-flex>
      </n-tab-pane>

      <n-tab-pane name="export" tab="Экспорт">
        <n-flex
          justify="center"
          align="center"
          style="height: 200px; color: #999"
        >
          Экспорт
        </n-flex>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped lang="scss">
.orders-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 24px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 16px;
}

.search {
  margin-bottom: 16px;
  max-width: 200px;
}
</style>
