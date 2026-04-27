import { useAuthStore } from '@/stores';
import { type RouterOptions, createRouter, createWebHistory } from 'vue-router';

import { authRoutes } from './authRoutes';
import { baseRoutes } from './baseRoutes';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    component: () => import('@/pages/AuthPage.vue'),
    children: authRoutes,
  },
  {
    path: '/',
    component: () => import('@/pages/BasePage.vue'),
    children: baseRoutes,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const isAuthRoute = ['/login', '/signup'].includes(to.path);

  if (authStore.token && !authStore.user) {
    await authStore.initAuth();
  }

  if (!authStore.isAuthenticated && !isAuthRoute) {
    return { path: 'login' };
  }

  if (authStore.isAuthenticated && isAuthRoute) {
    return { path: 'orders' };
  }
});
