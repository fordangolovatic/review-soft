import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import locationApi from '../../service/locations/locationApi';
import { Country } from '../../types/locations/location';

export const COUNTRIES_QUERY_KEY = ['countries'];

export const useCountriesQuery = (
  options?: UseQueryOptions<Country[], unknown, Country[]>,
) => {
  const { getCountries } = locationApi();

  return useQuery<Country[], unknown, Country[]>(
    COUNTRIES_QUERY_KEY,
    async (): Promise<Country[]> => await getCountries(),
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      useErrorBoundary: true,
    },
  );
};
