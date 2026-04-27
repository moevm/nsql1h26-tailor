<script setup lang="ts">
import type { Order } from '@/types';
import { NInput } from 'naive-ui';
import { ref, watch } from 'vue';

interface Props {
  items?: Order[];
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  placeholder: 'Поиск по названию заказа',
});

const emit = defineEmits<{
  (event: 'update:filtered', value: Order[]): void;
}>();

const query = ref('');

function normalizeQuery(value: string): string {
  return value.trim().toLowerCase();
}

function buildOrderSearchText(order: Order): string {
  const lastSix = order._id.slice(-6);
  const itemNames = order.items.map((item) => item.name).join(' ');
  return `${lastSix} #${lastSix} ${itemNames}`.toLowerCase();
}

function filterOrders(orders: Order[], value: string): Order[] {
  const normalizedQuery = normalizeQuery(value);

  if (!normalizedQuery) {
    return orders;
  }

  return orders.filter((order) =>
    buildOrderSearchText(order).includes(normalizedQuery),
  );
}

watch(
  [() => props.items, query],
  () => {
    emit('update:filtered', filterOrders(props.items, query.value));
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <n-input
    v-model:value="query"
    :placeholder="props.placeholder"
    round
    clearable
    class="search-bar"
  />
</template>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
}
</style>