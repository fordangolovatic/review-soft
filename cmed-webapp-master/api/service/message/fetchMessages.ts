import api from '../../config/api';

export const fetchMessages = async () => {
  return await api.get('messages').then((res) => res.data);
};
