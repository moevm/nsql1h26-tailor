<script setup lang="ts">
import { type NavItem, SideNav, ToolBar } from '@/components/layout';
import { useAuthStore } from '@/stores';
import { type Role } from '@/types/auth';
import {
  ImportExportRound,
  PieChartRound,
  ShoppingCartRound,
} from '@vicons/material';
import { NLayout, NLayoutContent } from 'naive-ui';
import { computed } from 'vue';

const authStore = useAuthStore();

const menuByRole: Record<Role, NavItem[]> = {
  customer: [
    { text: 'Мои заказы', href: '/orders', icon: ShoppingCartRound },
  ],
  tailor: [
    { text: 'Заказы', href: '/orders', icon: ShoppingCartRound },
  ],
  manager: [
    { text: 'Управление заказами', href: '/orders', icon: ShoppingCartRound },
    { text: 'Аналитика', href: '/analytics', icon: PieChartRound },
    { text: 'Импорт/Экспорт', href: '/import-export', icon: ImportExportRound },
  ],
};

const items = computed(() => menuByRole[authStore.user?.role ?? 'customer']);
</script>

<template>
  <n-layout >
    <ToolBar />
    <n-layout has-sider>
      <SideNav :items="items" />
      <n-layout-content class="base-layout">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="scss">
.base-layout {
  padding: 1rem 1rem;
}
</style>