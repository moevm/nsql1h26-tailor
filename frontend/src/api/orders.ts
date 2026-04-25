import type { Order } from '@/types';
import { api } from './index';

export const ordersApi = {
  getAll: () => api.get<Order[]>('/orders'),

  getByCustomer: (customerId: string) =>
    api.get<Order[]>('/orders', { params: { customerId } }),

  getByTailor: (tailorId: string) =>
    api.get<Order[]>('/orders', { params: { tailorId } }),

  getUnassigned: () =>
    api.get<Order[]>('/orders', { params: { unassigned: true } }),
};
