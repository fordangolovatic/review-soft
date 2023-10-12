import api from '../../config/api';

export const deleteMessage = async (messageId: number) => {
  return await api
    .delete(`messages/${messageId}`)
    .then((res) => res.data.affected > 0);
};
