<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { PersonRound } from '@vicons/material';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Props {
  firstName: string;
  lastName: string;
  email: string;
}

const props = defineProps<Props>();

function handleProfile() {
  router.push('/profile');
}
</script>

<template>
  <n-button @click="handleProfile">
    <template #icon>
      <n-icon>
        <PersonRound />
      </n-icon>
    </template>
    {{ props.firstName }} {{ props.lastName }} ({{ props.email }})
  </n-button>
</template>

<style lang="scss" scoped></style>