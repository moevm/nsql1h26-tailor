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
    name: 'orders',
    component: () => import('@/pages/OrdersPage.vue'),
  },
  {
    path: '/orders/new',
    name: 'NewOrder',
    component: () => import('@/pages/NewOrderPage.vue'),
  },
  {
    path: '/orders/:id',
    name: 'OrderDetail',
    component: () => import('@/pages/OrderDetailPage.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
