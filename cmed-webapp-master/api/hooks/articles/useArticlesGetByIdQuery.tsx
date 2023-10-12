import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getArticleById } from '../../service/article';
import { Article } from '../../types/articles';

export const ARTICLES_QUERY_KEY = ['articles'];

export const useArticlesGetByIdQuery = (
  id: number,
  options?: UseQueryOptions<Article>,
) => {
  return useQuery<Article>(
    [...ARTICLES_QUERY_KEY, id],
    async (): Promise<Article> => {
      return await getArticleById(id);
    },
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );
};
