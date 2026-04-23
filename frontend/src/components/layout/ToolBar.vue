<script setup lang="ts">
import { computed } from 'vue';
import { NLayoutHeader, NFlex } from 'naive-ui';
import { useRoute } from 'vue-router';
import { LogOutButton, ProfileButton } from '@/components/buttons';

const route = useRoute();

const title = computed(() => route.name)
</script>

<template>
  <n-layout-header bordered>
    <n-flex justify="space-between" align="center" class="layout-header">
      <h1>{{ title }}</h1>
      <n-flex justify="space-between" align="center">
        <ProfileButton first-name="Иван" last-name="Иванов" email="ivan@example.com" />
        <LogOutButton />
      </n-flex>
    </n-flex>
  </n-layout-header>
</template>

<style lang="scss" scoped>
.layout-header {
  padding: 0 24px;
}
</style>