<script setup lang="ts">
import { SearchBar } from '@/components/inputs';
import type { Order, OrderFilters, OrderStatus } from '@/types';
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
import { computed, ref, watch } from 'vue';

interface Props {
  items?: Order[];
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
});

const emit = defineEmits<{
  change: [filters: OrderFilters];
  'update:filtered': [value: Order[]];
}>();

const searchBarRef = ref<{ reset: () => void } | null>(null);
const searchQuery = ref('');
const dateRange = ref<[number, number] | null>(null);
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);
const status = ref<OrderStatus | null>(null);

const statusOptions: SelectOption[] = (
  Object.entries(ORDER_STATUS_LABELS) as [OrderStatus, string][]
).map(([value, label]) => ({ value, label }));

const hasActiveFilters = computed(
  () =>
    !!searchQuery.value ||
    dateRange.value !== null ||
    minPrice.value !== null ||
    maxPrice.value !== null ||
    status.value !== null,
);

watch([dateRange, minPrice, maxPrice, status], () => {
  const filters: OrderFilters = {};
  if (dateRange.value) {
    filters.startDate = new Date(dateRange.value[0]).toISOString();
    filters.endDate = new Date(dateRange.value[1]).toISOString();
  }
  if (minPrice.value !== null) filters.minPrice = minPrice.value;
  if (maxPrice.value !== null) filters.maxPrice = maxPrice.value;
  if (status.value) filters.status = status.value;
  emit('change', filters);
});

function reset() {
  searchBarRef.value?.reset();
  dateRange.value = null;
  minPrice.value = null;
  maxPrice.value = null;
  status.value = null;
}
</script>

<template>
  <n-flex :wrap="true" align="flex-end" :size="12">
    <SearchBar
      ref="searchBarRef"
      :items="props.items"
      class="search-bar"
      @update:filtered="emit('update:filtered', $event)"
      @update:query="searchQuery = $event"
    />
    <n-flex vertical :size="4" class="period-filter">
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
        :max="maxPrice ?? undefined"
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
        :min="minPrice ?? 0"
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
    <n-button v-if="hasActiveFilters" size="small" @click="reset"
      >Сбросить</n-button
    >
  </n-flex>
</template>

<style scoped lang="scss">
.search-bar {
  flex: 1 0 140px;
  max-width: 20%;
}
.period-filter {
  flex: 1 0 300px;
  max-width: 33%;
}
</style>
