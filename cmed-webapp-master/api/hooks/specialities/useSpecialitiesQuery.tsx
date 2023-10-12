import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Speciality } from '../../../components/AskDoctor/types';
import { specialitiesApi } from '../../service/specialities/specialitiesApi';

export const SPECIALITIES_QUERY_KEY = ['specialities'];

export const useSpecialitiesQuery = (
  options?: UseQueryOptions<Speciality[], unknown, Speciality[]>,
) => {
  const { getSpecialities } = specialitiesApi();

  return useQuery<Speciality[], unknown, Speciality[]>(
    SPECIALITIES_QUERY_KEY,
    async (): Promise<Speciality[]> => await getSpecialities(),
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      useErrorBoundary: true,
    },
  );
};
