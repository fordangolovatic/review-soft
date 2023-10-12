import api from '../../config/api';

export const removeFavoriteDoctor = async (favoriteId: number) => {
  const res = await api.delete(`favorite-doctors/remove/${favoriteId}`);

  return res.data.affected > 0;
};
