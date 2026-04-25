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
        name: 'login',
        component: () => import('@/components/cards/LoginCard.vue'),
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('@/components/cards/SignUpCard.vue'),
      },
    ],
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
