<script setup lang="ts">
import { useAuthStore } from '@/stores';
import { NButton, NInput, useDialog, useMessage } from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const message = useMessage();
const dialog = useDialog();

const firstName = ref(authStore.user?.name.firstName ?? '');
const lastName = ref(authStore.user?.name.lastName ?? '');
const patronymic = ref(authStore.user?.name.patronymic ?? '');
const email = ref(authStore.user?.email ?? '');
const phone = ref(authStore.user?.phone ?? '');

async function handleSave() {
  if (
    !firstName.value.trim() ||
    !lastName.value.trim() ||
    !email.value.trim()
  ) {
    message.warning('Заполните обязательные поля');
    return;
  }

  try {
    await authStore.updateProfile({
      name: {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        patronymic: patronymic.value.trim() || undefined,
      },
      email: email.value.trim(),
      phone: phone.value.trim() || undefined,
    });
    message.success('Профиль обновлён');
  } catch {
    message.error('Ошибка при обновлении профиля');
  }
}

function handleLogout() {
  dialog.info({
    title: 'Выйти из аккаунта?',
    positiveText: 'Да',
    negativeText: 'Нет',
    onPositiveClick: () => {
      authStore.logout();
      router.push('/login');
      message.success('Вы успешно вышли из аккаунта');
    },
  });
}
</script>

<template>
  <div class="page">
    <h1 class="page-title"><em>Профиль</em></h1>

    <div class="profile-grid">
      <div class="profile-fields">
        <div class="field-group">
          <span class="field-label"
            >Фамилия <span class="required">*</span></span
          >
          <n-input v-model:value="lastName" placeholder="Фамилия" />
        </div>

        <div class="field-group">
          <span class="field-label">Имя <span class="required">*</span></span>
          <n-input v-model:value="firstName" placeholder="Имя" />
        </div>

        <div class="field-group">
          <span class="field-label">Отчество</span>
          <n-input v-model:value="patronymic" placeholder="Отчество" />
        </div>

        <div class="field-group">
          <span class="field-label">Email <span class="required">*</span></span>
          <n-input v-model:value="email" placeholder="Email" />
        </div>

        <div class="field-group">
          <span class="field-label">Телефон</span>
          <n-input v-model:value="phone" placeholder="+7 (999) 999-99-99" />
        </div>
      </div>

      <div class="profile-actions">
        <n-button
          type="primary"
          round
          :loading="authStore.isLoading"
          class="action-btn"
          @click="handleSave"
        >
          Сохранить
        </n-button>

        <n-button round class="action-btn logout-btn" @click="handleLogout">
          Выйти
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

.profile-grid {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 32px;
  align-items: start;
}

.profile-fields {
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

.field-value {
  font-size: 14px;
  color: #333;
}

.required {
  color: #FF0000;
}

.profile-actions {
  padding-top: 52px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
}

.action-btn {
  width: 160px;
  height: 48px;
  font-size: 15px;
  font-weight: 600;
}

.logout-btn {
  color: #FF0000;
  border-color: #FF0000;
}
</style>
