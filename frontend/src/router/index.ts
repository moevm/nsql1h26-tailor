import { type RouterOptions, createRouter, createWebHistory } from 'vue-router';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'Вход в систему',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/signup',
    name: 'Регистрация',
    component: () => import('@/pages/SignUpPage.vue'),
  },
  {
    path: '/orders',
    name: 'Заказы',
    component: () => import('@/pages/OrdersPage.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
