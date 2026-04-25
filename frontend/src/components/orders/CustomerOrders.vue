<script setup lang="ts">
import { useAuthStore, useOrdersStore } from '@/stores';
import type { Order, OrderStatus } from '@/types';
import { AccountCircleFilled } from '@vicons/material';
import {
  NButton,
  NDataTable,
  NFlex,
  NIcon,
  NInput,
  NSpin,
  NTag,
  useMessage,
} from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { computed, h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ORDER_STATUS_LABELS } from '@/types/order';

const authStore = useAuthStore();
const ordersStore = useOrdersStore();
const router = useRouter();
const message = useMessage();

const search = ref('');

onMounted(async () => {
  if (authStore.user) {
    await ordersStore.fetchForCurrentUser();
  }
});

const statusTagType = (status: OrderStatus) => {
  const map: Record<OrderStatus, 'default' | 'info' | 'warning' | 'success' | 'error'> = {
    created: 'default',
    accepted: 'info',
    in_progress: 'warning',
    done: 'success',
    cancelled: 'error',
  };
  return map[status];
};

const filteredOrders = computed(() =>
  ordersStore.orders.filter((o) =>
    o._id.includes(search.value.trim()),
  ),
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
      h(NTag, { type: statusTagType(row.status), size: 'small', round: true }, {
        default: () => ORDER_STATUS_LABELS[row.status],
      }),
  },
  {
    title: 'Действия',
    key: 'actions',
    render: (row) =>
      h(
        NButton,
        {
          size: 'small',
          type: 'default',
          disabled: row.status !== 'done',
          onClick: () => message.info('Добавление отзыва'),
        },
        { default: () => 'Add Review' },
      ),
  },
];

function handleLogout() {
  authStore.logout();
  router.push('/login');
}
</script>

<template>
  <div class="orders-page">
    <n-flex justify="space-between" align="center" class="header">
      <h1 class="title"><em>Мои заказы</em></h1>
      <n-button quaternary circle @click="handleLogout">
        <template #icon>
          <n-icon :component="AccountCircleFilled" size="28" />
        </template>
      </n-button>
    </n-flex>

    <n-input
      v-model:value="search"
      placeholder="Поиск"
      round
      clearable
      class="search"
    />

    <n-spin :show="ordersStore.isLoading">
      <n-data-table
        :columns="columns"
        :data="filteredOrders"
        :pagination="false"
        :bordered="true"
        size="small"
      />
    </n-spin>

    <n-button type="primary" round class="place-order-btn" @click="message.info('Создание заказа')">
      Новый заказ
    </n-button>
  </div>
</template>

<style scoped lang="scss">
.orders-page {
  max-width: 700px;
  margin: 40px auto;
  padding: 0 24px;
}

.header {
  margin-bottom: 16px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.search {
  margin-bottom: 16px;
  max-width: 200px;
}

.place-order-btn {
  margin-top: 24px;
  float: right;
}
</style>
