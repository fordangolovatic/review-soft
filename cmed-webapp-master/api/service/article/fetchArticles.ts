import { AxiosError } from 'axios';
import api from '../../config/api';
import { Article } from '../../types/articles';
import { ApiFilters } from '../doctors/doctorsApi';

export type ArticleType = 'medical' | 'general' | 'news';

interface ArticlesApiReturn {
  getAllArticles: (
    filters?: ApiFilters,
    articleType?: ArticleType,
  ) => Promise<Article[]>;

  getUserArticles: () => Promise<Article[]>;
}

export const fetchArticles = (): ArticlesApiReturn => {
  const getAllArticles = async (
    filters?: ApiFilters,
    articleType?: ArticleType,
  ): Promise<Article[]> => {
    return await api
      .get('articles', {
        params: {
          ...filters,
          type: articleType || 'general',
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        return error.response.data as AxiosError;
      });
  };

  const getUserArticles = async (): Promise<Article[]> => {
    return await api
      .get('articles/me')
      .then((res) => res.data)
      .catch((error) => error.response.data as AxiosError);
  };

  return { getAllArticles, getUserArticles };
};
