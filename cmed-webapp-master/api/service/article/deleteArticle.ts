import api from '../../config/api';

export const deleteArticle = async (articleId: number) => {
  return await api.delete(`articles/${articleId}`).then((res) => res.data);
};
