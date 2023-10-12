import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { MedicalRecord } from '../../../components/Profile/MedicalRecord/types';
import medicalRecordApi from '../../service/account/medical-record/medicalRecordApi';
import { defaultMedicalRecordValues } from './useMedicalRecordQuery';

export const MEDICAL_RECORD_QUERY_KEY = ['medical-record'];

export const useMedicalRecordByUserIdQuery = (
  medicalRecordId: number,
  options?: UseQueryOptions<MedicalRecord>,
) => {
  const { getMedicalRecordByUserId } = medicalRecordApi();

  return useQuery<MedicalRecord>(
    MEDICAL_RECORD_QUERY_KEY,
    async (): Promise<MedicalRecord> => {
      try {
        const { data } = await getMedicalRecordByUserId(medicalRecordId);
        return data;
      } catch (error) {
        /* empty */
      }

      return defaultMedicalRecordValues;
    },
    {
      ...options,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 0,
    },
  );
};
