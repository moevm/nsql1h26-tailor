import { type Role } from '@/types/auth';
import { type RouteRecordRaw } from 'vue-router';

type RouteMeta = {
  requiresAuth: true;
  roles?: Role[];
};

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/orders',
    name: 'Мои заказы',
    component: () => import('@/pages/OrdersPage.vue'),
    meta: { requiresAuth: true } satisfies RouteMeta,
  },
  {
    path: '/orders/new',
    name: 'Новый заказ',
    component: () => import('@/pages/NewOrderPage.vue'),
    meta: { requiresAuth: true } satisfies RouteMeta,
  },
  {
    path: '/orders/:id',
    name: 'Детали заказа',
    component: () => import('@/pages/OrderDetailPage.vue'),
    meta: { requiresAuth: true } satisfies RouteMeta,
  },
  {
    path: '/analytics',
    name: 'Аналитика',
    component: () => import('@/pages/AnalyticsPage.vue'),
    meta: { requiresAuth: true } satisfies RouteMeta,
  },
  {
    path: '/import-export',
    name: 'Импорт/Экспорт',
    component: () => import('@/pages/ImportExportPage.vue'),
    meta: { requiresAuth: true } satisfies RouteMeta,
  },
];
