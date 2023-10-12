import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Doctor } from '../../../components/Departments/Doctors/types';
import { useGlobalState } from '../../../utilities/global-state';
import doctorsApi from '../../service/doctors/doctorsApi';

const queryKey = ['doctors'];

export const useDoctorsQuery = (options?: UseQueryOptions<Doctor[]>) => {
  const { filters, sort } = useGlobalState();

  const specialities = filters.specialities.map((speciality) => speciality.value);
  const languages = filters.languages.map((language) => language.value);
  const countries = filters.countries.map((country) => country.value);

  return useQuery<Doctor[]>(
    [...queryKey, ...specialities, ...languages, ...countries, sort],
    async (): Promise<Doctor[]> => {
      return await doctorsApi().getAllDoctors(
        {
          specialities,
          languages,
          countries,
        },
        sort,
      );
    },
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );
};
