/**
 * @file main.ts
 * @description Точка входа для приложения на Vue.js.
 * @author @KorzikAlex
 */
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { router } from './router';

// Инициализация Pinia для управления состоянием приложения
const pinia = createPinia();

// Создание экземпляра приложения Vue
const app = createApp(App);

// Подключение компонентов к приложению
app.use(pinia);
app.use(router);

// Монтирование приложения на элемент с id 'app'
app.mount('#app');
