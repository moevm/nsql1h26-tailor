<script setup lang="ts">
import { NLayout, NLayoutContent } from 'naive-ui';
import { SideNav, type NavItem, ToolBar } from '@/components/layout';
import { useAuthStore } from '@/stores';

type role = 'customer' | 'tailor' | 'manager';

const authStore = useAuthStore();

const menuByRole: Record<role, NavItem[]> = {
  customer: [
  ],
  tailor: [
  ],
  manager: [
  ],
};

const items = menuByRole['customer'];
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