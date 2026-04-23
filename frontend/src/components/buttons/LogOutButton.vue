<script setup lang="ts">
import { LogOutRound } from '@vicons/material';
import { NButton, NIcon } from 'naive-ui';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';

function handleLogOut() {
  authStore.logout();
  router.push('/login');
}

const router = useRouter();
const authStore = useAuthStore();
</script>

<template>
  <n-button @click="handleLogOut">
    <template #icon>
      <n-icon>
        <LogOutRound />
      </n-icon>
    </template>
    Выход
  </n-button>
</template>

<style lang="scss" scoped></style>