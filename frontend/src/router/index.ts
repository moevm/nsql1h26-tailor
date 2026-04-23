import { type RouterOptions, createRouter, createWebHistory } from 'vue-router';

import { authRoutes, homeRoutes } from './routes';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'Авторизация',
    component: () => import('@/pages/AuthPage.vue'),
    children: authRoutes,
  },
  {
    path: '/home',
    name: 'Главная',
    component: () => import('@/pages/BasePage.vue'),
    props: {
      items: [
        { text: 'Главная', href: '/home' },
        { text: 'Профиль', href: '/home/profile' },
        { text: 'Настройки', href: '/home/settings' },
      ],
    },
    children: homeRoutes,
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
