<script setup lang="ts">
import { type MenuOption, NIcon, NLayoutSider, NMenu } from 'naive-ui';
import { type Component, computed, h } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import type { NavItem } from './shared';

interface Props {
  items: NavItem[];
}

const props = defineProps<Props>();

const route = useRoute();

/**
 * Функция для рендера иконки
 */
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

/**
 * Опции меню
 */
const menuOptions = computed<MenuOption[]>(() =>
  props.items.map((item) => ({
    label: () => h(RouterLink, { to: item.href }, { default: () => item.text }),
    key: item.href,
    icon: item.icon ? renderIcon(item.icon) : undefined,
  })),
);

const activeKey = computed(() => route.path);
</script>

<template>
  <n-layout-sider bordered show-trigger collapse-mode="width" class="side-nav">
    <n-menu :options="menuOptions" :value="activeKey" />
  </n-layout-sider>
</template>

<style lang="scss" scoped>
</style>