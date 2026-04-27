<script setup lang="ts">
import { ordersApi } from '@/api/orders';
import { workersApi } from '@/api/workers';
import { useAuthStore } from '@/stores';
import type { Order, OrderStatus, Worker } from '@/types';
import { ORDER_STATUS_LABELS } from '@/types/order';
import { NButton, NSelect, NSpin, NTag, useMessage } from 'naive-ui';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const message = useMessage();

const order = ref<Order | null>(null);
const isLoading = ref(false);
const isSaving = ref(false);
const workers = ref<Worker[]>([]);

const selectedWorkerId = ref<string | null>(null);
const selectedStatus = ref<OrderStatus | null>(null);

const role = computed(() => authStore.user?.role);
const orderId = computed(() => route.params.id as string);
const currentUserId = computed(() => authStore.user?._id ?? '');

const tailorId = computed(() => {
  if (!order.value?.tailorId) return null;
  return typeof order.value.tailorId === 'string'
    ? order.value.tailorId
    : order.value.tailorId._id;
});

const canAccept = computed(
  () =>
    role.value === 'tailor' &&
    order.value?.status === 'created' &&
    !tailorId.value,
);

const canUpdateStatus = computed(
  () =>
    role.value === 'tailor' &&
    tailorId.value === currentUserId.value &&
    ['accepted', 'in_progress'].includes(order.value?.status ?? ''),
);

const orderNumber = computed(() =>
  order.value ? `#${order.value._id.slice(-6).toUpperCase()}` : '',
);

const STATUS_TYPES: Record<
  OrderStatus,
  'default' | 'info' | 'warning' | 'success' | 'error'
> = {
  created: 'default',
  accepted: 'info',
  in_progress: 'warning',
  done: 'success',
  cancelled: 'error',
};

const orderItems = computed(() => order.value?.items ?? []);
const totalPrice = computed(() =>
  orderItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

function formatDate(dateStr: string | undefined): {
  date: string;
  time: string;
} {
  if (!dateStr) return { date: '-', time: '' };
  const d = new Date(dateStr);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return { date: `${day}.${month}.${year}`, time: `${hours}:${minutes}` };
}

const createdAt = computed(() => formatDate(order.value?.createdAt));
const updatedAt = computed(() => formatDate(order.value?.updatedAt));
const showUpdatedAt = computed(() => order.value?.status !== 'created');

const workerStatusOptions = [
  { label: 'В процессе', value: 'in_progress' },
  { label: 'Готов', value: 'done' },
  { label: 'Отменен', value: 'cancelled' },
];

const managerStatusOptions = (
  Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]
).map((s) => ({ label: ORDER_STATUS_LABELS[s], value: s }));

const workerOptions = computed(() =>
  workers.value.map((w) => ({
    label: w.name.lastName,
    value: w._id,
  })),
);

onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await ordersApi.getById(orderId.value);
    order.value = res.data;

    if (role.value === 'manager') {
      selectedWorkerId.value = tailorId.value;
      selectedStatus.value = order.value.status;
      const workersRes = await workersApi.getAll();
      workers.value = workersRes.data;
    } else if (role.value === 'tailor') {
      selectedStatus.value = order.value.status as OrderStatus;
    }
  } catch {
    message.error('Ошибка загрузки заказа');
  } finally {
    isLoading.value = false;
  }
});

async function handleAccept() {
  isSaving.value = true;
  try {
    await ordersApi.update(orderId.value, {
      tailorId: currentUserId.value,
      status: 'accepted',
    });
    message.success('Заказ принят');
    router.push('/orders');
  } catch {
    message.error('Ошибка');
  } finally {
    isSaving.value = false;
  }
}

async function handleUpdateStatus() {
  if (!selectedStatus.value) return;
  isSaving.value = true;
  try {
    await ordersApi.update(orderId.value, { status: selectedStatus.value });
    message.success('Статус обновлён');
    router.push('/orders');
  } catch {
    message.error('Ошибка');
  } finally {
    isSaving.value = false;
  }
}

async function handleManagerUpdate() {
  isSaving.value = true;
  try {
    await ordersApi.update(orderId.value, {
      tailorId: selectedWorkerId.value,
      status: selectedStatus.value ?? undefined,
    });
    message.success('Заказ обновлён');
    router.push('/orders');
  } catch {
    message.error('Ошибка');
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <div class="page">
    <n-spin :show="isLoading">
      <template v-if="order">
        <div class="header-row">
          <div class="title-row">
            <h1 class="page-title">
              <em>Заказ {{ orderNumber }}</em>
            </h1>
            <n-tag :type="STATUS_TYPES[order.status]" round size="medium">
              {{ ORDER_STATUS_LABELS[order.status] }}
            </n-tag>
          </div>
          <div class="dates">
            <div class="date-item">
              <span class="date-label">Создан:</span>
              <div class="date-vals">
                <span>{{ createdAt.date }}</span>
                <span>{{ createdAt.time }}</span>
              </div>
            </div>
            <div v-if="showUpdatedAt" class="date-item">
              <span class="date-label">Обновлён:</span>
              <div class="date-vals">
                <span>{{ updatedAt.date }}</span>
                <span>{{ updatedAt.time }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="order-grid">
          <div class="order-left">
            <div class="price-dict">
              <div
                v-for="(item, idx) in orderItems"
                :key="idx"
                class="price-row"
              >
                <div class="price-row-top">
                  <span class="price-name">{{ item.name }}</span>
                  <span class="price-subtotal">
                    {{ (item.price * item.quantity).toLocaleString('ru-RU') }} ₽
                  </span>
                </div>
                <div class="price-row-meta">
                  <span v-if="item.description" class="price-desc">{{
                    item.description
                  }}</span>
                  <span class="price-qty-unit">
                    {{ item.quantity }} шт. x
                    {{ item.price.toLocaleString('ru-RU') }} ₽
                  </span>
                </div>
              </div>
              <div class="price-total-row">
                <span class="price-total-label">Итого</span>
                <span class="price-total-val">
                  {{ totalPrice.toLocaleString('ru-RU') }} ₽
                </span>
              </div>
            </div>
          </div>

          <div class="order-right">
            <template v-if="role === 'manager'">
              <n-select
                v-model:value="selectedWorkerId"
                :options="workerOptions"
                placeholder="Работник"
                clearable
                class="ctrl"
              />
              <n-select
                v-model:value="selectedStatus"
                :options="managerStatusOptions"
                placeholder="Статус"
                class="ctrl"
              />
              <n-button
                type="primary"
                round
                :loading="isSaving"
                class="action-btn"
                @click="handleManagerUpdate"
              >
                Обновить
              </n-button>
            </template>

            <template v-else-if="role === 'tailor'">
              <template v-if="canAccept">
                <n-button
                  type="primary"
                  round
                  :loading="isSaving"
                  class="action-btn"
                  @click="handleAccept"
                >
                  Принять заказ
                </n-button>
              </template>
              <template v-else-if="canUpdateStatus">
                <n-select
                  v-model:value="selectedStatus"
                  :options="workerStatusOptions"
                  placeholder="Статус"
                  class="ctrl"
                />
                <n-button
                  type="primary"
                  round
                  :loading="isSaving"
                  class="action-btn"
                  @click="handleUpdateStatus"
                >
                  Обновить статус
                </n-button>
              </template>
            </template>
          </div>
        </div>
      </template>
    </n-spin>
  </div>
</template>

<style scoped lang="scss">
.page {
  max-width: 700px;
  margin: 40px auto;
  padding: 0 24px;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.dates {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: right;
  font-size: 13px;
  color: #555;
}

.date-item {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.date-label {
  white-space: nowrap;
}

.date-vals {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.order-grid {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 32px;
  align-items: start;
}

.order-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price-dict {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.price-row {
  padding: 10px 14px;
  border-bottom: 1px solid #f0f0f0;

  &:last-of-type {
    border-bottom: none;
  }
}

.price-row-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
}

.price-name {
  font-weight: 600;
  font-size: 14px;
}

.price-subtotal {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
}

.price-row-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-top: 2px;
}

.price-desc {
  font-size: 12px;
  color: #777;
}

.price-qty-unit {
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  margin-left: auto;
}

.price-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #f7f7f7;
  border-top: 1px solid #e0e0e0;
}

.price-total-label {
  font-size: 14px;
  font-weight: 700;
}

.price-total-val {
  font-size: 15px;
  font-weight: 700;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label {
  font-size: 13px;
  color: #555;
}

.order-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
}

.ctrl {
  width: 100%;
}

.action-btn {
  height: 64px;
  font-size: 15px;
  font-weight: 600;
  white-space: normal;
  text-align: center;
  line-height: 1.3;
}
</style>
