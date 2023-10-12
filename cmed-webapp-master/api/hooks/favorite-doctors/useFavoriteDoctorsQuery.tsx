import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchFavoriteDoctors } from '../../service/favorite-doctors';
import { FavoriteDoctor } from '../../types/favorite-doctors';

export const FAVORITE_DOCTORS_QUERY_KEY = ['favorite-doctors'];

export const useFavoriteDoctorsQuery = (
  options: UseQueryOptions<FavoriteDoctor[]>,
) => {
  return useQuery<FavoriteDoctor[]>(
    FAVORITE_DOCTORS_QUERY_KEY,
    async (): Promise<FavoriteDoctor[]> => {
      return await fetchFavoriteDoctors();
    },
    {
      ...options,
    },
  );
};
