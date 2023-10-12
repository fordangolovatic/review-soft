import api from '../../../config/api';

export const fetchAccount = async () => {
  return await api.get('users/me');
};
