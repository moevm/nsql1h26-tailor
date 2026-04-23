<script setup lang="ts">
import { NLayout } from 'naive-ui';
</script>

<template>
  <n-layout embedded>
    <div class="auth-page">
      <router-view />
    </div>
  </n-layout>
</template>

<style lang="scss" scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  box-sizing: border-box;

  @media (max-width: 500px) {
    padding: 5%;
  }
}
</style>
