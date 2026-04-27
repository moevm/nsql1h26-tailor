import type { RouteRecordRaw } from 'vue-router';

type GuestRouteMeta = {
  guestOnly: true;
};

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: { path: 'login' },
  },
  {
    path: 'login',
    name: 'Вход в систему',
    component: () => import('@/components/cards/LoginCard.vue'),
    meta: { guestOnly: true } satisfies GuestRouteMeta,
  },
  {
    path: 'signup',
    name: 'Регистрация',
    component: () => import('@/components/cards/SignUpCard.vue'),
    meta: { guestOnly: true } satisfies GuestRouteMeta,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404 Not Found',
    component: () => import('@/components/cards/NotFoundCard.vue'),
  },
];
