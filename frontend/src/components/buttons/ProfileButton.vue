<script setup lang="ts">
import { PersonRound } from '@vicons/material';
import { NButton, NEl, NIcon } from 'naive-ui';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

interface Props {
  firstName: string;
  lastName: string;
  email: string;
}

const props = defineProps<Props>();

function handleProfile() {
  if (route.path !== '/profile') {
    router.push('/profile');
  }
}
</script>

<template>
  <n-button @click="handleProfile">
    <template #icon>
      <n-icon>
        <PersonRound />
      </n-icon>
    </template>
    <template #default>
      <n-el tag="span" class="button-text">
        {{ props.firstName }} {{ props.lastName }}
        <template v-if="props.email">({{ props.email }})</template>
      </n-el>
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
