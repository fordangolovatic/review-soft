import api from '../../config/api';
import { Article } from '../../types/articles';

export const getArticleById = async (id: number): Promise<Article> => {
  const result = await api.get(`articles/${id}`);
  return result.data;
};
