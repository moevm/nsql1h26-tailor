<script setup lang="ts">
import { useAuthStore } from '@/stores';
import {
  type FormInst,
  type FormRules,
  NButton,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NInput,
  useDialog,
  useMessage,
} from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const message = useMessage();
const dialog = useDialog();

const formRef = ref<FormInst | null>(null);

const formValues = ref({
  firstName: authStore.user?.name.firstName ?? '',
  lastName: authStore.user?.name.lastName ?? '',
  patronymic: authStore.user?.name.patronymic ?? '',
  email: authStore.user?.email ?? '',
  phone: authStore.user?.phone ?? '',
});

const rules: FormRules = {
  lastName: [{ required: true, message: 'Введите фамилию', trigger: 'blur' }],
  firstName: [{ required: true, message: 'Введите имя', trigger: 'blur' }],
  email: [{ required: true, message: 'Введите email', trigger: 'blur' }],
};

async function handleSave() {
  formRef.value?.validate(async (errors) => {
    if (errors) return;
    try {
      await authStore.updateProfile({
        name: {
          firstName: formValues.value.firstName.trim(),
          lastName: formValues.value.lastName.trim(),
          patronymic: formValues.value.patronymic.trim() || undefined,
        },
        email: formValues.value.email.trim(),
        phone: formValues.value.phone.trim() || undefined,
      });
      message.success('Профиль обновлён');
    } catch {
      message.error('Ошибка при обновлении профиля');
    }
  });
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
    <n-form ref="formRef" :model="formValues" :rules="rules">
      <n-grid :cols="24" :x-gap="32">
        <n-grid-item :span="17">
          <n-form-item label="Фамилия" path="lastName">
            <n-input
              v-model:value="formValues.lastName"
              placeholder="Фамилия"
            />
          </n-form-item>
          <n-form-item label="Имя" path="firstName">
            <n-input v-model:value="formValues.firstName" placeholder="Имя" />
          </n-form-item>
          <n-form-item label="Отчество" path="patronymic">
            <n-input
              v-model:value="formValues.patronymic"
              placeholder="Отчество"
            />
          </n-form-item>
          <n-form-item label="Email" path="email">
            <n-input v-model:value="formValues.email" placeholder="Email" />
          </n-form-item>
          <n-form-item label="Телефон" path="phone">
            <n-input
              v-model:value="formValues.phone"
              placeholder="+7 (999) 999-99-99"
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item :span="7" class="actions">
          <n-form-item>
            <n-button
              type="primary"
              round
              block
              :loading="authStore.isLoading"
              @click="handleSave"
            >
              Сохранить
            </n-button>
          </n-form-item>
          <n-form-item>
            <n-button type="error" round block @click="handleLogout">
              Выйти
            </n-button>
          </n-form-item>
        </n-grid-item>
      </n-grid>
    </n-form>
  </div>
</template>

<style scoped lang="scss">
.page {
  max-width: 700px;
  margin: 40px auto;
  padding: 0 24px;
}

.actions {
  padding-top: 28px;
}
</style>
