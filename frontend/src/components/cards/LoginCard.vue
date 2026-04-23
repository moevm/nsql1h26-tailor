<script setup lang="ts">
import { useAuthStore } from '@/stores';
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
import { type Component, ref } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Конфигурация поля формы
 */
type FormFieldConfig = {
  key: 'email' | 'password';
  label: string;
  placeholder: string;
  type?: 'text' | 'password';
  autocomplete?: string;
  icon: Component;
  showPasswordOn?: 'click';
};

const router = useRouter(); // Роутер для навигации'

const authStore = useAuthStore(); // Ссылка на хранилище аутентификации

const message = useMessage(); // Сервис для отображения сообщений

const formRef = ref<FormInst | null>(null); // Ссылка на форму

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
const formValues = ref({
  email: '',
  password: '',
});

/**
 * Конфигурация полей формы для входа в систему
 */
const formFields: FormFieldConfig[] = [
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
      router.push('/home');
    } else {
      message.error('Пожалуйста, исправьте ошибки в форме');
    }
  });
}
</script>

<template>
  <n-form
    ref="formRef"
    :model="formValues"
    :rules="rules"
    class="login-form"
    :size="'large'"
  >
    <n-card title=" Вход в систему" size="huge" rounded>
      <n-form-item
        v-for="field in formFields"
        :key="field.key"
        :label="field.label"
        :path="field.key"
        :class="field.key"
      >
        <n-input
          v-model:value="formValues[field.key]"
          :type="field.type || 'text'"
          :placeholder="field.placeholder"
          :input-props="{ name: field.key, autocomplete: field.autocomplete }"
          :show-password-on="field.showPasswordOn"
          round
          clearable
        >
          <template #prefix>
            <n-icon :component="field.icon" />
          </template>
        </n-input>
      </n-form-item>
      <n-flex justify="center">
        <n-form-item class="submit">
          <n-button
            type="primary"
            block
            :disabled="!formValues.email || !formValues.password"
            round
            @click="handleSubmit"
          >
            Войти
          </n-button>
        </n-form-item>

        <n-form-item>
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
  width: 500px;
}
</style>
