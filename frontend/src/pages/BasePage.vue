<script setup lang="ts">
import { type NavItem, SideNav, ToolBar } from '@/components/layout';
import { useAuthStore } from '@/stores';
import { type role } from '@/types/auth';
import {
  HomeRound,
  ImportExportRound,
  PieChartRound,
  ShoppingCartRound,
} from '@vicons/material';
import { NLayout, NLayoutContent } from 'naive-ui';
import { computed } from 'vue';

const authStore = useAuthStore();

const menuByRole: Record<role, NavItem[]> = {
  customer: [
    { text: 'Главная', href: '/home', icon: HomeRound },
    { text: 'Мои заказы', href: '/orders', icon: ShoppingCartRound },
  ],
  tailor: [
    { text: 'Главная', href: '/home', icon: HomeRound },
    { text: 'Заказы', href: '/orders', icon: ShoppingCartRound },
  ],
  manager: [
    { text: 'Главная', href: '/home', icon: HomeRound },
    { text: 'Управление заказами', href: '/orders', icon: ShoppingCartRound },
    { text: 'Статистика', href: '/statistics', icon: PieChartRound },
    { text: 'Импорт/Экспорт', href: '/import-export', icon: ImportExportRound },
  ],
};

const items = computed(() => menuByRole[authStore.user?.role ?? 'customer']);
</script>

<template>
  <n-layout>
    <ToolBar />
    <n-layout has-sider>
      <SideNav :items="items" />
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped style="scss"></style>
