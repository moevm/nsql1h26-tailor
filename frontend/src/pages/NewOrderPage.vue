<script setup lang="ts">
import { ordersApi } from '@/api/orders';
import { useAuthStore } from '@/stores';
import { NButton, NInput, NInputNumber, NSelect, useMessage } from 'naive-ui';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const message = useMessage();

const serviceType = ref<string | null>(null);
const description = ref('');
const quantity = ref<number>(1);
const isLoading = ref(false);

const SERVICE_PRICES: Record<string, number> = {
  Ремонт: 2500,
  Пошив: 5000,
};

const serviceTypeOptions = [
  { label: 'Ремонт', value: 'Ремонт' },
  { label: 'Пошив', value: 'Пошив' },
];

const price = computed(() =>
  serviceType.value ? (SERVICE_PRICES[serviceType.value] ?? 0) : 0,
);
const totalPrice = computed(() => price.value * quantity.value);

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
          quantity: quantity.value,
          price: price.value,
        },
      ],
      status: 'created',
      totalPrice: totalPrice.value,
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

        <div class="row-two">
          <div class="field-group">
            <span class="field-label">Количество</span>
            <n-input-number v-model:value="quantity" :min="1" />
          </div>
          <div class="field-group">
            <span class="field-label">Стоимость</span>
            <div class="price-display">
              <template v-if="serviceType">
                {{ price.toLocaleString('ru-RU') }} ₽ x {{ quantity }} =
                <strong>{{ totalPrice.toLocaleString('ru-RU') }} ₽</strong>
              </template>
              <template v-else>—</template>
            </div>
          </div>
        </div>
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

.row-two {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.price-display {
  height: 34px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  gap: 4px;
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
