<script setup lang="ts">
import { SearchBar } from '@/components/inputs';
import type { Order, OrderFilters } from '@/types';
import { NDataTable, NFlex, NSpin } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import OrderFiltersPanel from './OrderFiltersPanel.vue';

const props = defineProps<{
  columns: DataTableColumns<Order>;
  load: (filters?: OrderFilters) => Promise<Order[]>;
}>();

const router = useRouter();
const orders = ref<Order[]>([]);
const filteredOrders = ref<Order[]>([]);
const isLoading = ref(false);

onMounted(() => fetchOrders());

async function fetchOrders(filters?: OrderFilters) {
  isLoading.value = true;
  try {
    orders.value = await props.load(filters);
  } finally {
    isLoading.value = false;
  }
}

function handleRowProps(row: Order) {
  return {
    style: 'cursor: pointer',
    onClick: () => router.push(`/orders/${row._id}`),
  };
}
</script>

<template>
  <n-flex vertical :size="16">
    <order-filters-panel @change="fetchOrders" />
    <SearchBar v-model:filtered="filteredOrders" :items="orders" />
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
    <slot />
  </n-flex>
</template>
