<script setup lang="ts">
import { LogOutRound } from '@vicons/material';
import { NButton, NIcon } from 'naive-ui';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';

function handleLogOut() {
  authStore.logout();
  router.push({ name: 'login' });
}

const router = useRouter();
const authStore = useAuthStore();
</script>

<template>
  <n-button @click="handleLogOut">
    <n-icon>
      <LogOutRound />
    </n-icon>
  </n-button>
</template>

<style lang="scss" scoped></style>