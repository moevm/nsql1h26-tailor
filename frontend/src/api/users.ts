import { type UpdateProfilePayload } from '@/types';

import { api } from './index';

export const usersApi = {
  updateMe: (payload: UpdateProfilePayload) => api.put('/users/me', payload),
};
