import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useGlobalState } from '../../../utilities/global-state';
import { ArticleType, fetchArticles } from '../../service/article/fetchArticles';
import { Article } from '../../types/articles';

export const ARTICLES_QUERY_KEY = ['articles'];

export const useArticlesQuery = (
  articleType: ArticleType = 'general',
  options?: UseQueryOptions<Article[]>,
) => {
  const { getAllArticles } = fetchArticles();

  const { filters } = useGlobalState();

  const specialities = filters.specialities.map((speciality) => speciality.value);
  const languages = filters.languages.map((language) => language.value);

  return useQuery<Article[]>(
    [...ARTICLES_QUERY_KEY, articleType, ...specialities, ...languages],
    async (): Promise<Article[]> => {
      return await getAllArticles(
        {
          specialities,
          languages,
        },
        articleType,
      );
    },
    {
      ...options,
      enabled: !!articleType,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );
};
