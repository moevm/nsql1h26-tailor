<script setup lang="ts">
import { useAuthStore } from '@/stores';
import { type SignInDto } from '@/api/schemas';
import { EmailFilled, KeyFilled } from '@vicons/material';
import {
  type FormInst,
  type FormRules,
  NButton,
  NCard,
  NFlex,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  useMessage,
} from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import type { FormFieldConfig } from './shared';

const router = useRouter(); // Роутер для навигации'

const authStore = useAuthStore(); // Ссылка на хранилище аутентификации

const message = useMessage(); // Сервис для отображения сообщений

const formRef = ref<FormInst>(); // Ссылка на форму

/**
 * Правила валидации для полей формы
 */
const rules: FormRules = {
  email: [
    {
      required: true,
      message: 'Введите электронную почту',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Введите пароль',
      trigger: 'blur',
    },
  ],
};

/**
 * Значения полей формы
 */
const formValues = ref<SignInDto>({
  email: '',
  password: '',
});

/**
 * Конфигурация полей формы для входа в систему
 */
const formFields: FormFieldConfig<keyof SignInDto>[] = [
  {
    key: 'email',
    label: 'Электронная почта',
    placeholder: 'Введите электронную почту',
    type: 'text',
    autocomplete: 'email',
    icon: EmailFilled,
  },
  {
    key: 'password',
    label: 'Пароль',
    placeholder: 'Введите пароль',
    type: 'password',
    autocomplete: 'current-password',
    icon: KeyFilled,
    showPasswordOn: 'click',
  },
];

/**
 * Обработчик отправки формы
 */
async function handleSubmit() {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      router.push('/dashboard');
    } else {
      message.error('Пожалуйста, исправьте ошибки в форме');
    }
  });
}
</script>

<template>
  <n-form ref="formRef" :model="formValues" :rules="rules" class="login-form" :size="'large'">
    <n-card title="Вход в систему" size="large" rounded>
      <n-form-item v-for="field in formFields" :key="field.key" :label="field.label" :path="field.key"
        :class="field.key">
        <n-input v-model:value="formValues[field.key]" :type="field.type || 'text'" :placeholder="field.placeholder"
          :input-props="{ name: field.key, autocomplete: field.autocomplete }" :show-password-on="field.showPasswordOn"
          round clearable>
          <template #prefix>
            <n-icon :component="field.icon" />
          </template>
        </n-input>
      </n-form-item>
      <n-flex justify="center">
        <n-form-item class="submit">
          <n-button type="primary" block :disabled="!formValues.email || !formValues.password" round
            @click="handleSubmit">
            Войти
          </n-button>
        </n-form-item>

        <n-form-item class="signup-link">
          <router-link to="/signup">
            <n-button quaternary round :disabled="authStore.isLoading">
              Нет аккаунта?
            </n-button>
          </router-link>
        </n-form-item>
      </n-flex>
    </n-card>
  </n-form>
</template>

<style scoped lang="scss">
.login-form {
  width: min(400px, 100%)
}
</style>
