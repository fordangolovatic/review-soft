import api from '../../config/api';
import { CreateArticle } from '../../types/articles';

export const createArticle = async (article: CreateArticle) => {
  return await api.post('articles', article).then((res) => res.data);
};
