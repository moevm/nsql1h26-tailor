import { api } from './index';

export const exportApi = {
  exportReport: (params: { users?: boolean; orders?: boolean }) =>
    api.get('/export', { params }),
};
