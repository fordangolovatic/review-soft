import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import locationApi from '../../service/locations/locationApi';
import { City } from '../../types/locations/location';

export const CITIES_QUERY_KEY = ['city'];

export const useCitiesQuery = (
  options?: UseQueryOptions<City[], unknown, City[]>,
) => {
  const { getCities } = locationApi();

  return useQuery<City[], unknown, City[]>(
    CITIES_QUERY_KEY,
    async (): Promise<City[]> => getCities(),
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );
};
