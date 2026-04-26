<script setup lang="ts">
import { ordersApi } from '@/api/orders';
import { useAuthStore } from '@/stores';
import { NButton, NInput, NSelect, useMessage } from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const message = useMessage();

const serviceType = ref<string | null>(null);
const description = ref('');
const isLoading = ref(false);

const serviceTypeOptions = [
  { label: 'Ремонт', value: 'Ремонт' },
  { label: 'Пошив', value: 'Пошив' },
];

async function handleSubmit() {
  if (!serviceType.value) {
    message.warning('Выберите тип услуги');
    return;
  }
  if (!authStore.user) return;

  isLoading.value = true;
  try {
    await ordersApi.create({
      customerId: authStore.user._id,
      items: [
        {
          name: serviceType.value,
          description: description.value,
          quantity: 1,
          price: 0,
        },
      ],
      status: 'created',
      totalPrice: 0,
    });
    message.success('Заказ успешно создан');
    router.push('/orders');
  } catch {
    message.error('Ошибка при создании заказа');
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="page">
    <h1 class="page-title"><em>Новый заказ</em></h1>

    <div class="order-grid">
      <div class="order-left">
        <n-select
          v-model:value="serviceType"
          :options="serviceTypeOptions"
          placeholder="Тип"
        />

        <n-input
          v-model:value="description"
          type="textarea"
          placeholder="Описание"
          :rows="5"
        />
      </div>

      <div class="order-right">
        <n-button
          type="primary"
          round
          :loading="isLoading"
          class="action-btn"
          @click="handleSubmit"
        >
          Отправить заказ
        </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  max-width: 700px;
  margin: 40px auto;
  padding: 0 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 24px;
}

.order-grid {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 32px;
  align-items: start;
}

.order-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label {
  font-size: 13px;
  color: #555;
}

.order-right {
  padding-top: 52px;
  display: flex;
  justify-content: flex-end;
}

.action-btn {
  width: 160px;
  height: 64px;
  font-size: 15px;
  font-weight: 600;
  white-space: normal;
  text-align: center;
  line-height: 1.3;
}
</style>
