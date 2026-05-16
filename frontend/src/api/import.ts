import { api } from './index';

export const importApi = {
  importFile: (file: File, params: { users?: boolean; orders?: boolean }) => {
    const formData = new FormData();
    formData.append('file', file);
    if (params.users) formData.append('users', 'true');
    if (params.orders) formData.append('orders', 'true');
    return api.post('/import/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
