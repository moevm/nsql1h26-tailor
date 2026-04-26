<script setup lang="ts">
import { LogOutButton, ProfileButton } from '@/components/buttons';
import { useAuthStore } from '@/stores';
import { NFlex, NLayoutHeader } from 'naive-ui';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();

const title = computed(() => route.name);
const profileInfo = computed(() => ({
  firstName: authStore.user?.name?.firstName ?? 'Пользователь',
  lastName: authStore.user?.name?.lastName ?? '',
}));
</script>

<template>
  <n-layout-header bordered>
    <n-flex justify="space-between" align="center" class="layout-header">
      <h1>{{ title }}</h1>
      <n-flex justify="space-between" align="center">
        <ProfileButton
          :first-name="profileInfo.firstName"
          :last-name="profileInfo.lastName"
        />
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
