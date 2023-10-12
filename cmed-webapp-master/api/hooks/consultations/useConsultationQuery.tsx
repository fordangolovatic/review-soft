import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchConsultations } from '../../service/consultations';
import { Consultation } from '../../types/consultations/consultations';

export const CONSULTATION_QUERY_KEY = ['consultation'];

export const useConsultationsQuery = (options?: UseQueryOptions<Consultation[]>) => {
  return useQuery<Consultation[]>(
    CONSULTATION_QUERY_KEY,
    async (): Promise<Consultation[]> => {
      return await fetchConsultations();
    },
    {
      ...options,
    },
  );
};
