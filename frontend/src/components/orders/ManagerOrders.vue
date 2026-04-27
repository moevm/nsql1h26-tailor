<script setup lang="ts">
import { exportApi } from '@/api/export';
import { importApi } from '@/api/import';
import { ordersApi } from '@/api/orders';
import ManagerAnalytics from '@/components/analytics/ManagerAnalytics.vue';
import type { Order, OrderStatus, OrderTailor } from '@/types';
import { ORDER_STATUS_LABELS } from '@/types/order';
import {
  NButton,
  NCheckbox,
  NDataTable,
  NInput,
  NSpin,
  NTabPane,
  NTabs,
  NTag,
  NUpload,
  useMessage,
} from 'naive-ui';
import type { DataTableColumns, UploadFileInfo } from 'naive-ui';
import { computed, h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const message = useMessage();

const orders = ref<Order[]>([]);
const isLoading = ref(false);
const search = ref('');
const activeTab = ref('orders');

const exportUsers = ref(true);
const exportOrders = ref(true);
const exportAnalytics = ref(false);
const isExporting = ref(false);

const importUsers = ref(true);
const importOrders = ref(true);
const importFileList = ref<UploadFileInfo[]>([]);
const isImporting = ref(false);

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

async function handleExport() {
  if (!exportUsers.value && !exportOrders.value && !exportAnalytics.value) {
    message.warning('Выберите хотя бы один пункт для экспорта');
    return;
  }
  isExporting.value = true;
  try {
    const res = await exportApi.exportReport({
      users: exportUsers.value,
      orders: exportOrders.value,
    });
    if (res.data) {
      message.success('Экспорт выполнен');
    } else {
      message.warning(
        'Реализация данной функции будет выполнена в дальнейшем в прототипе "Анализ"',
      );
    }
  } catch {
    message.error(
      'Реализация данной функции будет выполнена в дальнейшем в прототипе "Анализ"',
    );
  } finally {
    isExporting.value = false;
  }
}

async function handleImport() {
  if (!importUsers.value && !importOrders.value) {
    message.warning('Выберите хотя бы один тип данных для импорта');
    return;
  }
  if (!importFileList.value.length) {
    message.warning('Выберите файл для импорта');
    return;
  }
  isImporting.value = true;
  try {
    const res = await importApi.importData({
      users: importUsers.value,
      orders: importOrders.value,
    });
    if (res.data) {
      message.success('Данные успешно импортированы');
      importFileList.value = [];
    } else {
      message.warning(
        'Реализация данной функции будет выполнена в дальнейшем в прототипе "Анализ"',
      );
    }
  } catch {
    message.error(
      'Реализация данной функции будет выполнена в дальнейшем в прототипе "Анализ"',
    );
  } finally {
    isImporting.value = false;
  }
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
        <h1 class="title"><em>Импорт</em></h1>
        <div class="check-group">
          <n-checkbox v-model:checked="importUsers">Пользователи</n-checkbox>
          <div class="check-row">
            <n-checkbox v-model:checked="importOrders">Заказы</n-checkbox>
            <n-upload
              v-model:file-list="importFileList"
              :max="1"
              accept=".json,.csv"
              :show-file-list="false"
            >
              <n-button size="small" secondary>
                {{
                  importFileList.length
                    ? importFileList[0].name
                    : 'Выбрать файл'
                }}
              </n-button>
            </n-upload>
          </div>
        </div>
        <n-button
          type="primary"
          round
          :loading="isImporting"
          class="action-btn"
          @click="handleImport"
        >
          Импорт
        </n-button>
      </n-tab-pane>

      <n-tab-pane name="export" tab="Экспорт">
        <h1 class="title"><em>Экспорт</em></h1>
        <div class="check-group">
          <n-checkbox v-model:checked="exportUsers">Пользователи</n-checkbox>
          <n-checkbox v-model:checked="exportOrders">Заказы</n-checkbox>
          <n-checkbox v-model:checked="exportAnalytics">Аналитика</n-checkbox>
        </div>
        <n-button
          type="primary"
          round
          :loading="isExporting"
          class="action-btn"
          @click="handleExport"
        >
          Экспорт
        </n-button>
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

.check-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 32px;
}

.check-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-btn {
  height: 52px;
  min-width: 160px;
  font-size: 15px;
  font-weight: 600;
}
</style>
