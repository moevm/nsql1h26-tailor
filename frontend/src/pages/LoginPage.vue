<script setup lang="ts">
/**
 * @file LoginPage.vue
 * @description Страница входа в систему
 * @author @KorzikAlex
 */
import { LoginCard } from '@/components/cards';
</script>

<template>
  <div class="login-page">
    <LoginCard />
  </div>
</template>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
}
</style>
