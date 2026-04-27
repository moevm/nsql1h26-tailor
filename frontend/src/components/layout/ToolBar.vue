<script setup lang="ts">
import { BackButton, LogOutButton, ProfileButton } from '@/components/buttons';
import { useAuthStore } from '@/stores';
import { NFlex, NLayoutHeader } from 'naive-ui';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const title = computed(() => route.name);
const canNavigateBack = computed(() => Boolean(route.meta?.canNavigateBack));
const profileInfo = computed(() => ({
  firstName: authStore.user?.name?.firstName ?? 'Пользователь',
  lastName: authStore.user?.name?.lastName ?? '',
}));

function navigateUp() {
  router.back();
}
</script>

<template>
  <n-layout-header bordered>
    <n-flex justify="space-between" align="center" class="layout-header">
      <n-flex align="center">
        <BackButton
          :can-navigate-back="canNavigateBack"
          :on-navigate-up="navigateUp"
        />
        <h1>{{ title }}</h1>
      </n-flex>
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
