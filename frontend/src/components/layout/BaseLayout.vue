<script setup lang="ts">
import { NLayout } from 'naive-ui';
import { SideNav } from '.';
import type { NavItem } from './shared';

interface Props {
  items: NavItem[];
}

const props = defineProps<Props>();
</script>

<template>
  <n-layout>
    <ToolBar />
    <n-layout has-sider>
      <SideNav :items="props.items" />
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped style="scss"></style>