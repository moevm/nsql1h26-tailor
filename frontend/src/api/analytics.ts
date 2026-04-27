import type { Order } from '@/types';

import { api } from './index';

export interface AnalyticsFilter {
  startDate?: string;
  endDate?: string;
  tailorId?: string;
  status?: string;
}

export const analyticsApi = {
  getAnalytics: (filter: AnalyticsFilter) =>
    api.get<Order[]>('/analytics', { params: filter }),
};
