import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: { path: 'login' },
  },
  {
    path: 'login',
    name: 'Вход в систему',
    component: () => import('@/components/cards/LoginCard.vue'),
  },
  {
    path: 'signup',
    name: 'Регистрация',
    component: () => import('@/components/cards/SignUpCard.vue'),
  },
];
