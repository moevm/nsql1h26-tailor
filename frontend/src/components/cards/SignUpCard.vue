<script setup lang="ts">
import { useAuthStore } from '@/stores';
import {
  EmailFilled,
  KeyFilled,
  PersonFilled,
  PhoneFilled,
} from '@vicons/material';
import {
  type FormInst,
  type FormItemRule,
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
import type { FormFieldConfig, ModelType } from './shared';

const router = useRouter(); // Роутер для навигации

const authStore = useAuthStore(); // Ссылка на хранилище аутентификации

const message = useMessage(); // Сервис для отображения сообщений

/**
 * Тип модели формы
 */
interface Model extends ModelType {
  firstName: string;
  secondName: string;
  patronymic: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};



/**
 * Ссылка на форму
 */
const formRef = ref<FormInst>();

/**
 * Конфигурация полей формы
 */
const formFields = ref<FormFieldConfig[]>([
  {
    key: 'firstName',
    label: 'Имя',
    placeholder: 'Введите имя',
    autocomplete: 'given-name',
    icon: PersonFilled,
    class: 'username',
  },
  {
    key: 'secondName',
    label: 'Фамилия',
    placeholder: 'Введите фамилию',
    autocomplete: 'family-name',
    icon: PersonFilled,
    class: 'surname',
  },
  {
    key: 'patronymic',
    label: 'Отчество',
    placeholder: 'Введите отчество',
    autocomplete: 'additional-name',
    icon: PersonFilled,
    class: 'patronymic',
  },
  {
    key: 'phone',
    label: 'Телефон',
    placeholder: 'Введите номер телефона',
    autocomplete: 'tel',
    icon: PhoneFilled,
    class: 'phone',
  },
  {
    key: 'email',
    label: 'Электронная почта',
    placeholder: 'Введите электронную почту',
    autocomplete: 'email',
    icon: EmailFilled,
    class: 'email',
  },
  {
    key: 'password',
    label: 'Пароль',
    placeholder: 'Введите пароль',
    type: 'password',
    autocomplete: 'new-password',
    icon: KeyFilled,
    class: 'password',
    showPasswordOn: 'click',
  },
  {
    key: 'confirmPassword',
    label: 'Подтвердите пароль',
    placeholder: 'Введите пароль еще раз',
    type: 'password',
    autocomplete: 'new-password',
    icon: KeyFilled,
    class: 'confirm-password',
    showPasswordOn: 'click',
  },
]);

/**
 * Правила валидации формы
 */
const rules: FormRules = {
  firstName: [
    {
      required: true,
      message: 'Пожалуйста, введите имя',
      trigger: 'blur',
    },
  ],
  secondName: [
    {
      required: true,
      message: 'Пожалуйста, введите фамилию',
      trigger: 'blur',
    },
  ],
  patronymic: [
    {
      required: false,
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: 'Пожалуйста, введите электронную почту',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'Пожалуйста, введите корректный адрес электронной почты',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: false,
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Пожалуйста, введите пароль',
      trigger: 'blur',
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Пожалуйста, подтвердите пароль',
      trigger: 'blur',
    },
    {
      // Пользовательская валидация для подтверждения пароля
      validator: (_rule: FormItemRule, value: string) => {
        // Проверяем совпадение паролей
        if (value !== formValues.value.password) {
          return false;
        }
        return true;
      },
      message: 'Пароли не совпадают',
      trigger: 'blur',
    },
  ],
} as const;

/**
 * Значения формы
 */
const formValues = ref<Model>({
  firstName: '',
  secondName: '',
  patronymic: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
});

/**
 * Обработчик отправки формы
 */
async function handleSubmit() {
  // Валидируем форму
  formRef.value?.validate(async (errors) => {
    // Если ошибок нет, выполняем регистрацию
    if (!errors) {
      // Выполняем регистрацию
      router.push('/dashboard');
    } else {
      message.error('Пожалуйста, исправьте ошибки в форме');
    }
  });
}
</script>

<template>
  <n-form ref="formRef" :model="formValues" :rules="rules" class="signup-form">
    <n-card title="Регистрация в системе" size="huge" rounded>
      <n-form-item v-for="field in formFields" :key="field.key" :label="field.label" :path="field.key"
        :class="field.class">
        <n-input v-model:value="formValues[field.key]" :type="field.type || 'text'" :placeholder="field.placeholder"
          :input-props="{ name: field.key, autocomplete: field.autocomplete }" :class="`${field.class}-input`"
          :show-password-on="field.showPasswordOn" clearable round :disabled="authStore.isLoading">
          <template #prefix>
            <n-icon :component="field.icon"></n-icon>
          </template>
        </n-input>
      </n-form-item>

      <n-form-item class="submit">
        <n-button type="primary" block :disabled="!formValues.firstName ||
          !formValues.password ||
          !formValues.secondName ||
          !formValues.email
          " :loading="authStore.isLoading" class="submit-button" round @click="handleSubmit">
          Зарегистрироваться
        </n-button>
      </n-form-item>

      <n-flex justify="center">
        <n-form-item>
          <router-link to="/login">
            <n-button quaternary round :disabled="authStore.isLoading">
              Уже есть аккаунт? Войти
            </n-button>
          </router-link>
        </n-form-item>
      </n-flex>
    </n-card>
  </n-form>
</template>

<style scoped lang="scss">
.signup-form {
  width: 500px;
}
</style>
