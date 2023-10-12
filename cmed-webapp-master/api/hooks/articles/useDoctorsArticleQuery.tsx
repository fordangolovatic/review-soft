import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchArticles } from '../../service/article/fetchArticles';
import { Article } from '../../types/articles';

export const DOCTOR_ARTICLES_QUERY_KEY = ['doctor_articles'];

export const useDoctorArticleQuery = (options?: UseQueryOptions<Article[]>) => {
  const { getUserArticles } = fetchArticles();

  return useQuery<Article[]>(
    [...DOCTOR_ARTICLES_QUERY_KEY],
    async (): Promise<Article[]> => {
      return await getUserArticles();
    },
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );
};
