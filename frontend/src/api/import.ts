import { api } from './index';

export const importApi = {
  importData: (params: { users?: boolean; orders?: boolean }) =>
    api.get('/import', { params }),
};
