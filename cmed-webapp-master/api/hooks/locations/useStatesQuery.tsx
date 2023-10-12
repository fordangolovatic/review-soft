import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import locationApi from '../../service/locations/locationApi';
import { State } from '../../types/locations/location';

export const STATES_QUERY_KEY = ['states'];

export const useStatesQuery = (
  options?: UseQueryOptions<State[], unknown, State[]>,
) => {
  const { getStates } = locationApi();

  return useQuery<State[], unknown, State[]>(
    STATES_QUERY_KEY,
    async (): Promise<State[]> => await getStates(),
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      useErrorBoundary: true,
    },
  );
};
