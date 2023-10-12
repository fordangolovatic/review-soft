import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { DoctorProfile } from '../../../components/Departments/Doctors/types';
import doctorsApi from '../../service/doctors/doctorsApi';

const queryKey = ['doctor'];

export const useDoctorQuery = (
  doctorId: number,
  options?: UseQueryOptions<DoctorProfile>,
) => {
  const queryFn = async (): Promise<DoctorProfile> => {
    const res = await doctorsApi().getDoctorProfile(doctorId);
    return res;
  };
  return useQuery<DoctorProfile>({
    queryKey,
    queryFn,
    ...options,
    // refetchInterval: 5,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    // onError: () => {},
    // onSettled: () => {},
  });
};
