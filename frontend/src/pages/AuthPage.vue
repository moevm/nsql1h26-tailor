<script setup lang="ts">
</script>

<template>
  <div class="auth-page">
    <router-view />
  </div>
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
