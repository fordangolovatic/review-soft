import api from '../../config/api';

export const readMessages = async (convId: number) => {
  return await api.post(`messages/read/${convId}`).then((res) => res.data);
};
