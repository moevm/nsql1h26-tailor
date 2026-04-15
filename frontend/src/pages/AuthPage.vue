<script setup lang="ts">
import { LoginCard, SignUpCard } from '@/components/cards';

type AuthMode = 'login' | 'signup';

const props = withDefaults(
  defineProps<{ mode?: AuthMode; }>(),
  { mode: 'login', },
);
</script>

<template>
  <div class="auth-page">
    <LoginCard v-if="props.mode === 'login'" />
    <SignUpCard v-else />
  </div>
</template>

<style scoped lang="scss">
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
}
</style>
