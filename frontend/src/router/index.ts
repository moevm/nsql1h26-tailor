import { type RouterOptions, createRouter, createWebHistory } from 'vue-router';

const authPage = () => import('@/pages/AuthPage.vue');

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'Вход в систему',
    component: authPage,
    props: { mode: 'login' },
  },
  {
    path: '/signup',
    name: 'Регистрация',
    component: authPage,
    props: { mode: 'signup' },
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
