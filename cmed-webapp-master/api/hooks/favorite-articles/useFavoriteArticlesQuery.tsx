import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchFavoriteArticles } from '../../service/favorite-articles';
import { FavoriteArticle } from '../../types/favorite-articles';

export const FAVORITE_ARTICLES_QUERY_KEY = ['favorite-articles'];

export const useFavoriteArticlesQuery = (
  options: UseQueryOptions<FavoriteArticle[]>,
) => {
  return useQuery<FavoriteArticle[]>(
    FAVORITE_ARTICLES_QUERY_KEY,
    async (): Promise<FavoriteArticle[]> => {
      return await fetchFavoriteArticles();
    },
    {
      ...options,
    },
  );
};
