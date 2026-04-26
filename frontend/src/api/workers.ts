import type { Worker } from '@/types';

import { api } from './index';

export const workersApi = {
  getAll: () => api.get<Worker[]>('/workers'),
};
