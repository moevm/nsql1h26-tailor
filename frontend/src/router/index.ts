import { type RouterOptions, createRouter, createWebHistory } from 'vue-router';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    component: () => import('@/pages/AuthPage.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'login' },
      },
      {
        path: 'login',
        name: 'Вход в систему',
        component: () => import('@/components/cards/LoginCard.vue'),
      },
      {
        path: 'signup',
        name: 'Регистрация',
        component: () => import('@/components/cards/SignUpCard.vue'),
      },
    ],
  },
  {
    path: '/home',
    name: 'Главная',
    component: () => import('@/components/layout/BaseLayout.vue'),
    children: [],
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
