/**
 * @file router/index.ts
 * @description Конфигурация маршрутизатора для приложения на Vue.js.
 * @author @KorzikAlex
 */
import { type RouterOptions, createRouter, createWebHistory } from 'vue-router';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HelloWorld.vue'),
  },
];

/**
 * @constant router
 * @description Экземпляр маршрутизатора.
 */
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
