<script setup lang="ts">
import { ArrowBackRound } from '@vicons/material';
import { NButton, NIcon } from 'naive-ui';

defineProps<{
  canNavigateBack: boolean;
  onNavigateUp: () => void;
}>();
</script>

<template>
  <n-button v-if="canNavigateBack" quaternary @click="onNavigateUp">
    <template #icon>
      <n-icon><ArrowBackRound /></n-icon>
    </template>
    Назад
  </n-button>
</template>
