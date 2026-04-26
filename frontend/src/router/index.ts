import { useAuthStore } from '@/stores';
import { type RouterOptions, createRouter, createWebHistory } from 'vue-router';

import { authRoutes, homeRoutes } from './routes';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    component: () => import('@/pages/AuthPage.vue'),
    children: authRoutes,
  },
  {
    path: '/home',
    component: () => import('@/pages/BasePage.vue'),
    meta: { requiresAuth: true },
    children: homeRoutes,
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/pages/OrdersPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/orders/new',
    name: 'NewOrder',
    component: () => import('@/pages/NewOrderPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/orders/:id',
    name: 'OrderDetail',
    component: () => import('@/pages/OrderDetailPage.vue'),
    meta: { requiresAuth: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  const isAuthRoute = ['login', 'signup'].includes(to.name as string);

  if (!authStore.isAuthenticated && !isAuthRoute) {
    return { name: 'login' };
  }

  if (authStore.isAuthenticated && isAuthRoute) {
    return { name: 'orders' };
  }
});
