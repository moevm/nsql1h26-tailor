import { api } from './index';

export const exportApi = {
  exportFile: (params: { users?: boolean; orders?: boolean }) =>
    api.get('/export/file', { params, responseType: 'blob' }),
};
