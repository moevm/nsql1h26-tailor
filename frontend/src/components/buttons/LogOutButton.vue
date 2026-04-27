<script setup lang="ts">
import { useAuthStore } from '@/stores';
import { LogOutRound } from '@vicons/material';
import { NButton, NEl, NIcon, useDialog, useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const dialog = useDialog();
const message = useMessage();

function handleLogOut() {
  dialog.info({
    title: 'Выйти из аккаунта?',
    positiveText: 'Да',
    negativeText: 'Нет',
    onPositiveClick: () => {
      authStore.logout();
      router.push('/login');
      message.success('Вы успешно вышли из аккаунта');
    },
  });
}
</script>

<template>
  <n-button @click="handleLogOut">
    <template #icon>
      <n-icon>
        <LogOutRound />
      </n-icon>
    </template>
    <template #default>
      <n-el tag="span" class="button-text"> Выход </n-el>
    </template>
  </n-button>
</template>

<style lang="scss" scoped>
.button-text {
  @media (max-width: 600px) {
    display: none;
  }
}
</style>
