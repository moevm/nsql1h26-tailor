<script setup lang="ts">
/**
 * @file SignUpPage.vue
 * @description Страница регистрации в систему
 * @author @KorzikAlex
 */
import { SignUpCard } from '@/components/cards';
</script>

<template>
  <div class="signup-page">
    <SignUpCard />
  </div>
</template>

<style scoped lang="scss">
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
