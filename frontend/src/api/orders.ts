import type { Order } from '@/types';

import { api } from './index';

export const ordersApi = {
  getAll: () => api.get<Order[]>('/orders'),

  getById: (id: string) => api.get<Order>(`/orders/${id}`),

  getByCustomer: (customerId: string) =>
    api.get<Order[]>('/orders', { params: { customerId } }),

  getByTailor: (tailorId: string) =>
    api.get<Order[]>('/orders', { params: { tailorId } }),

  getUnassigned: () =>
    api.get<Order[]>('/orders', { params: { unassigned: true } }),

  create: (data: Record<string, unknown>) => api.post<Order>('/orders', data),

  update: (id: string, data: Record<string, unknown>) =>
    api.put(`/orders/${id}`, data),
};
