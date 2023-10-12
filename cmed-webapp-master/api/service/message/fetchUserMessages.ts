import api from '../../config/api';

export const fetchUserMessages = async (userId: number | undefined) => {
  return await api.get(`messages/${userId}`).then((res) => res.data);
};
