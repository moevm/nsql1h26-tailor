<script setup lang="ts">
import { analyticsApi } from '@/api/analytics';
import { workersApi } from '@/api/workers';
import type { Order, OrderStatus, Worker } from '@/types';
import { ORDER_STATUS_LABELS } from '@/types/order';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import {
  // NButton,
  NCheckbox,
  NDatePicker,
  NFlex,
  NSelect,
  NSpin,
} from 'naive-ui';
import { computed, onMounted, ref, watch } from 'vue';
import { Bar } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const orders = ref<Order[]>([]);
const workers = ref<Worker[]>([]);
const isLoading = ref(false);

const useDate = ref(false);
const useWorker = ref(false);
const useStatus = ref(false);

const dateRange = ref<[number, number] | null>(null);
const selectedTailorId = ref<string | null>(null);
const selectedStatus = ref<string | null>(null);

const workerOptions = computed(() =>
  workers.value.map((w) => ({
    label: `${w.name.lastName} ${w.name.firstName}`,
    value: w._id,
  })),
);

const statusOptions = (Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).map(
  (s) => ({ label: ORDER_STATUS_LABELS[s], value: s }),
);

async function fetchAnalytics() {
  isLoading.value = true;
  try {
    const filter: Record<string, string> = {};
    if (useDate.value && dateRange.value) {
      filter.startDate = new Date(dateRange.value[0]).toISOString();
      filter.endDate = new Date(dateRange.value[1]).toISOString();
    }
    if (useWorker.value && selectedTailorId.value) {
      filter.tailorId = selectedTailorId.value;
    }
    if (useStatus.value && selectedStatus.value) {
      filter.status = selectedStatus.value;
    }
    const res = await analyticsApi.getAnalytics(filter);
    orders.value = res.data;
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  const workersRes = await workersApi.getAll();
  workers.value = workersRes.data;
  await fetchAnalytics();
});

watch(
  [useDate, dateRange, useWorker, selectedTailorId, useStatus, selectedStatus],
  () => {
    fetchAnalytics();
  },
);

const chartData = computed(() => {
  const counts: Partial<Record<OrderStatus, number>> = {};
  const revenue: Partial<Record<OrderStatus, number>> = {};
  for (const o of orders.value) {
    counts[o.status] = (counts[o.status] ?? 0) + 1;
    revenue[o.status] = (revenue[o.status] ?? 0) + (o.totalPrice ?? 0);
  }
  const labels = (Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).filter(
    (s) => (counts[s] ?? 0) > 0,
  );
  return {
    labels: labels.map((s) => ORDER_STATUS_LABELS[s]),
    datasets: [
      {
        label: 'Кол-во заказов',
        data: labels.map((s) => counts[s] ?? 0),
        backgroundColor: '#023370',
        borderRadius: 6,
        yAxisID: 'y',
      },
      {
        label: 'Выручка (₽)',
        data: labels.map((s) => revenue[s] ?? 0),
        backgroundColor: '#02337055',
        borderRadius: 6,
        yAxisID: 'y1',
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index' as const, intersect: false },
  plugins: {
    legend: { position: 'top' as const },
    title: { display: false },
  },
  scales: {
    y: {
      type: 'linear' as const,
      position: 'left' as const,
      title: { display: true, text: 'Заказы' },
      beginAtZero: true,
      ticks: { stepSize: 1 },
    },
    y1: {
      type: 'linear' as const,
      position: 'right' as const,
      title: { display: true, text: 'Выручка (₽)' },
      beginAtZero: true,
      grid: { drawOnChartArea: false },
    },
  },
};

const totalOrders = computed(() => orders.value.length);
const completedOrders = computed(
  () => orders.value.filter((o) => o.status === 'done').length,
);
const totalRevenue = computed(() =>
  orders.value
    .filter((o) => o.status === 'done')
    .reduce((sum, o) => sum + (o.totalPrice ?? 0), 0),
);

// function exportCsv() {}
</script>

<template>
  <div class="analytics">
    <!-- <div class="header-row">
      <n-button type="primary" round @click="exportCsv">Экспорт</n-button>
    </div> -->

    <div class="content">
      <div class="filters">
        <div class="filter-block">
          <n-checkbox v-model:checked="useDate">По дате</n-checkbox>
          <n-date-picker
            v-if="useDate"
            v-model:value="dateRange"
            type="daterange"
            clearable
            class="filter-control"
          />
        </div>

        <div class="filter-block">
          <n-checkbox v-model:checked="useWorker">По работнику</n-checkbox>
          <n-select
            v-if="useWorker"
            v-model:value="selectedTailorId"
            :options="workerOptions"
            placeholder="Выберите работника"
            clearable
            class="filter-control"
          />
        </div>

        <div class="filter-block">
          <n-checkbox v-model:checked="useStatus">По статусу</n-checkbox>
          <n-select
            v-if="useStatus"
            v-model:value="selectedStatus"
            :options="statusOptions"
            placeholder="Выберите статус"
            clearable
            class="filter-control"
          />
        </div>

        <div class="stats">
          <div class="stat-item">
            <span class="stat-value">{{ totalOrders }}</span>
            <span class="stat-label">Всего заказов</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ completedOrders }}</span>
            <span class="stat-label">Завершённых</span>
          </div>
          <div class="stat-item">
            <span class="stat-value"
              >{{ totalRevenue.toLocaleString('ru-RU') }} ₽</span
            >
            <span class="stat-label">Выручка</span>
          </div>
        </div>
      </div>

      <div class="chart-wrapper">
        <n-spin :show="isLoading">
          <div style="height: 260px">
            <Bar
              v-if="!isLoading && orders.length > 0"
              :data="chartData"
              :options="chartOptions"
            />
            <n-flex
              v-else-if="!isLoading"
              justify="center"
              align="center"
              style="height: 100%; color: #999; font-size: 14px"
            >
              Нет данных для отображения
            </n-flex>
          </div>
        </n-spin>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.analytics {
  padding-top: 16px;
}

.header-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
}

.content {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
  align-items: start;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-control {
  width: 100%;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
  padding: 14px;
  background: #f5f7fa;
  border-radius: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #023370;
}

.stat-label {
  font-size: 12px;
  color: #555;
}

.chart-wrapper {
  min-height: 260px;
}
</style>
