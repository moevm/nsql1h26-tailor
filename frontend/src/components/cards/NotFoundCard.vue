<script setup lang="ts">
import { NButton, NCard, NFlex } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <n-card
    title="Ошибка 404: Страница не найдена"
    bordered
    class="not-found-card"
  >
    <n-flex vertical>
      Извините, страница, которую вы ищете, не существует. Пожалуйста, проверьте
      URL или вернитесь на главную страницу.
      <n-flex justify="center" align="center">
        <n-button type="primary" @click="router.push('/login')">
          Вернуться
        </n-button>
      </n-flex>
    </n-flex>
  </n-card>
</template>

<style lang="scss" scoped>
.not-found-card {
  width: 500px;

  @media (max-width: 500px) {
    width: 100%;
  }
}
</style>