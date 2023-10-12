import api from '../../config/api';

export const addFavoriteArticle = async (articleId: number) => {
  const res = await api.post('favorite-articles/add', { articleId });

  return res.data;
};
