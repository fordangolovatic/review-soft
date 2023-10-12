import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { MedicalRecord } from '../../../components/Profile/MedicalRecord/types';
import { useToast } from '../../../utilities/hooks/useToast';
import medicalRecordApi from '../../service/account/medical-record/medicalRecordApi';
import { MEDICAL_RECORD_QUERY_KEY } from './useMedicalRecordQuery';

export const useUpdateMedicalRecordMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  const { updateMedicalRecord } = medicalRecordApi();
  const { notifySuccess, notifyError } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ['updateMedicalRecord'],
    async (data: MedicalRecord): Promise<boolean> => {
      return await updateMedicalRecord(data);
    },
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(MEDICAL_RECORD_QUERY_KEY);
        notifySuccess('Your medical record has been successfully updated.');
      },
      onError: () => {
        notifyError("Couldn't update your medical record. Please try again.");
      },
    },
  );
};
