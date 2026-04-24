import { useAuthStore } from '@/stores';
import type { role } from '@/types/auth';
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
];

/**
 * @constant router
 * @description Экземпляр маршрутизатора.
 */
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const requiresAuth = Boolean(to.meta.requiresAuth);
  const isGuestOnly = Boolean(to.meta.guestOnly);
  const routeRoles = to.meta.roles as role[] | undefined;

  // Если маршрут требует авторизации, а пользователь не авторизован, перенаправляем на страницу входа
  if (requiresAuth && !authStore.isAuthenticated) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    };
  }

  // Если маршрут предназначен только для гостей,
  // а пользователь уже авторизован, перенаправляем на главную страницу
  if (isGuestOnly && authStore.isAuthenticated) {
    return '/home';
  }

  // Если маршрут имеет ограничения по ролям, проверяем роль пользователя
  if (routeRoles && routeRoles.length > 0) {
    if (!authStore.user) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      };
    }

    // Если роль пользователя не соответствует требованиям маршрута, перенаправляем на главную страницу
    if (!routeRoles.includes(authStore.user.role)) {
      return '/home';
    }
  }

  return true;
});
