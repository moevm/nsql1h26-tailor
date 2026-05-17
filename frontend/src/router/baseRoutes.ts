import { useAuthStore } from '@/stores';
import { type Role } from '@/types/auth';
import { type RouteRecordRaw } from 'vue-router';

type RouteMeta = {
  requiresAuth: true;
  roles?: Role[];
  canNavigateBack?: boolean;
};

const pathForRole: Record<Role, string> = {
  customer: '/orders/customer',
  tailor: '/orders/tailor',
  manager: '/orders/manager',
};

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/orders',
    component: () => import('@/pages/OrdersPage.vue'),
    meta: { requiresAuth: true } satisfies RouteMeta,
    children: [
      {
        path: '',
        redirect: () => {
          const authStore = useAuthStore();
          return pathForRole[authStore.user?.role ?? 'customer'];
        },
      },
      {
        path: 'customer',
        name: 'Мои заказы',
        component: () => import('@/components/orders/CustomerOrders.vue'),
      },
      {
        path: 'tailor',
        name: 'Заказы',
        component: () => import('@/components/orders/WorkerOrders.vue'),
      },
      {
        path: 'manager',
        name: 'Управление заказами',
        component: () => import('@/components/orders/ManagerOrders.vue'),
      },
      {
        path: 'new',
        name: 'Новый заказ',
        component: () => import('@/pages/NewOrderPage.vue'),
        meta: { requiresAuth: true, canNavigateBack: true } satisfies RouteMeta,
      },
      {
        path: ':id',
        name: 'Детали заказа',
        component: () => import('@/pages/OrderDetailPage.vue'),
        meta: { requiresAuth: true, canNavigateBack: true } satisfies RouteMeta,
      },
    ],
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
  {
    path: '/profile',
    name: 'Профиль',
    component: () => import('@/pages/ProfilePage.vue'),
    meta: { requiresAuth: true } satisfies RouteMeta,
  },
];
