<script setup lang="ts">
import type { OrderFilters, OrderStatus } from '@/types';
import { ORDER_STATUS_LABELS } from '@/types/order';
import {
  NButton,
  NDatePicker,
  NFlex,
  NInputNumber,
  NSelect,
  NText,
} from 'naive-ui';
import type { SelectOption } from 'naive-ui';
import { ref } from 'vue';

const emit = defineEmits<{
  change: [filters: OrderFilters];
}>();

const dateRange = ref<[number, number] | null>(null);
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);
const status = ref<OrderStatus | null>(null);

const statusOptions: SelectOption[] = (
  Object.entries(ORDER_STATUS_LABELS) as [OrderStatus, string][]
).map(([value, label]) => ({ value, label }));

function apply() {
  const filters: OrderFilters = {};
  if (dateRange.value) {
    filters.startDate = new Date(dateRange.value[0]).toISOString();
    filters.endDate = new Date(dateRange.value[1]).toISOString();
  }
  if (minPrice.value !== null) filters.minPrice = minPrice.value;
  if (maxPrice.value !== null) filters.maxPrice = maxPrice.value;
  if (status.value) filters.status = status.value;
  emit('change', filters);
}

function reset() {
  dateRange.value = null;
  minPrice.value = null;
  maxPrice.value = null;
  status.value = null;
  emit('change', {});
}
</script>

<template>
  <n-flex :wrap="true" align="flex-end" :size="12">
    <n-flex vertical :size="4">
      <n-text depth="3" style="font-size: 12px">Период</n-text>
      <n-date-picker
        v-model:value="dateRange"
        type="daterange"
        clearable
        size="small"
      />
    </n-flex>

    <n-flex vertical :size="4">
      <n-text depth="3" style="font-size: 12px">Цена от</n-text>
      <n-input-number
        v-model:value="minPrice"
        placeholder="0"
        :min="0"
        clearable
        size="small"
        style="width: 120px"
      />
    </n-flex>

    <n-flex vertical :size="4">
      <n-text depth="3" style="font-size: 12px">Цена до</n-text>
      <n-input-number
        v-model:value="maxPrice"
        placeholder="∞"
        :min="0"
        clearable
        size="small"
        style="width: 120px"
      />
    </n-flex>

    <n-flex vertical :size="4">
      <n-text depth="3" style="font-size: 12px">Статус</n-text>
      <n-select
        v-model:value="status"
        :options="statusOptions"
        placeholder="Все"
        clearable
        size="small"
        style="width: 160px"
      />
    </n-flex>

    <n-flex :size="8">
      <n-button size="small" type="primary" @click="apply">Применить</n-button>
      <n-button size="small" @click="reset">Сбросить</n-button>
    </n-flex>
  </n-flex>
</template>
