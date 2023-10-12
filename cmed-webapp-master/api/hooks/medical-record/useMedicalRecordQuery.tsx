import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  DrinkingStatus,
  MedicalRecord,
} from '../../../components/Profile/MedicalRecord/types';
import medicalRecordApi from '../../service/account/medical-record/medicalRecordApi';

export const MEDICAL_RECORD_QUERY_KEY = ['medical-record'];

export const defaultMedicalRecordValues: MedicalRecord = {
  medicalRecordId: undefined,
  gender: '',
  height: 0,
  weight: 0,
  operations: ['', ''],
  breaks: ['', ''],
  allergies: ['', ''],
  diseases: ['', ''],
  medicaments: ['', ''],
  medicalPhoto: '',
  drinkingStatus: DrinkingStatus.NEVER,
  isSmoking: false,
  packsPerDay: 0,
  yearsOfSmoking: 0,
  isDrinking: false,
};

export const useMedicalRecordQuery = (options?: UseQueryOptions<MedicalRecord>) => {
  const { getMedicalRecord } = medicalRecordApi();

  return useQuery<MedicalRecord>(
    MEDICAL_RECORD_QUERY_KEY,
    async (): Promise<MedicalRecord> => {
      try {
        const { data } = await getMedicalRecord();
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
