import api from '../../config/api';

export const removeFavoriteArticles = async (favoriteId: number) => {
  const res = await api.delete(`favorite-articles/remove/${favoriteId}`);

  return res.data.affected > 0;
};
