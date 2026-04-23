<script setup lang="ts">
import { computed } from 'vue';
import { NLayoutHeader } from 'naive-ui';
import { useRoute } from 'vue-router';

const route = useRoute();

const title = computed(() => route.name)
</script>

<template>
  <n-layout-header bordered>
    <h1>{{ title }}</h1>
    <LogOutButton />
  </n-layout-header>
</template>

<style lang="scss" scoped></style>