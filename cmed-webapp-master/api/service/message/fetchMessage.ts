import api from '../../config/api';

export const fetchMessage = async () => {
  return await api.get('messages').then((res) => {
    return res.data;
  });
};
