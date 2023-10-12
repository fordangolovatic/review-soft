import api from '../../config/api';

export const fetchFavoriteArticles = async () => {
  const res = await api.get('favorite-articles');

  return res.data;
};
