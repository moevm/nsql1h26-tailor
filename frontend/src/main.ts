/**
 * @file main.ts
 * @description Точка входа для приложения на Vue.js.
 * @author @KorzikAlex
 */
import App from '@/App.vue';
import { router } from '@/router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

// Инициализация Pinia для управления состоянием приложения
const pinia = createPinia();

// Создание экземпляра приложения Vue
const app = createApp(App);

// Подключение компонентов к приложению
app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, {
  enableDevtoolsV6Plugin: true,
});

// Монтирование приложения на элемент с id 'app'
app.mount('#app');
