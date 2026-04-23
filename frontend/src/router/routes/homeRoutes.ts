import type { role } from '@/types/auth';
import type { RouteRecordRaw } from 'vue-router';

type RouteMeta = {
  requiresAuth: true;
  roles?: role[];
};

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/orders',
    name: 'Заказы',
    component: () => import('@/pages/OrdersPage.vue'),
    meta: { requiresAuth: true } satisfies RouteMeta,
  },
  {
    path: '/profile',
    name: 'Профиль',
    component: () => import('@/pages/ProfilePage.vue'),
    meta: { requiresAuth: true } satisfies RouteMeta,
  },
  {
    path: '/statistics',
    name: 'Статистика',
    component: () => import('@/pages/management/StatisticsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['manager'],
    } satisfies RouteMeta,
  },
  {
    path: '/import-export',
    name: 'Импорт/Экспорт',
    component: () => import('@/pages/management/ImportExportPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['manager'],
    } satisfies RouteMeta,
  },
  {
    path: '',
    name: 'Главная',
    component: () => import('@/pages/HomePage.vue'),
    meta: { requiresAuth: true } satisfies RouteMeta,
  },
];
