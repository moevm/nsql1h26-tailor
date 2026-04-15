import { type RouterOptions, createRouter, createWebHistory } from 'vue-router';

/**
 * Конфигурация маршрутизации.
 */
const routes: RouterOptions['routes'] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Вход в систему',
    component: () => import('@/pages/AuthPage.vue'),
    props: {
      mode: 'login',
    },
  },
  {
    path: '/signup',
    name: 'Регистрация',
    component: () => import('@/pages/AuthPage.vue'),
    props: {
      mode: 'signup',
    },
  },
];

/**
 * Экземпляр маршрутизатора Vue Router.
 */
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
