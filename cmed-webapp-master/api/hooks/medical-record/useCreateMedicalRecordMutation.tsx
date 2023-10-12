import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { MedicalRecord } from '../../../components/Profile/MedicalRecord/types';
import { useToast } from '../../../utilities/hooks/useToast';
import medicalRecordApi from '../../service/account/medical-record/medicalRecordApi';

export const useCreateMedicalRecordMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  const { createMedicalRecord } = medicalRecordApi();
  const { notifySuccess, notifyError } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ['createMedicalRecord'],
    async (data: MedicalRecord): Promise<boolean> => {
      return await createMedicalRecord(data);
    },
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['medicalRecord'] });
        notifySuccess('Your medical record has been successfully created.');
      },
      onError: () => {
        notifyError("Couldn't create your medical record. Please try again.");
      },
    },
  );
};
