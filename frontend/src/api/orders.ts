import type { Order, OrderFilters } from '@/types';

import { api } from './index';

export const ordersApi = {
  getAll: (filters?: OrderFilters) =>
    api.get<Order[]>('/orders', { params: filters }),

  getById: (id: string) => api.get<Order>(`/orders/${id}`),

  getByCustomer: (customerId: string, filters?: OrderFilters) =>
    api.get<Order[]>('/orders', { params: { customerId, ...filters } }),

  getByTailor: (tailorId: string, filters?: OrderFilters) =>
    api.get<Order[]>('/orders', { params: { tailorId, ...filters } }),

  getUnassigned: () =>
    api.get<Order[]>('/orders', { params: { unassigned: true } }),

  create: (data: Record<string, unknown>) => api.post<Order>('/orders', data),

  update: (id: string, data: Record<string, unknown>) =>
    api.put(`/orders/${id}`, data),
};
