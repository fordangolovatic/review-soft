import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { updateConsultation } from '../../service/consultations';
import { Consultation } from '../../types/consultations/consultations';

export const useUpdateConsultationMutation = (
  options?: UseMutationOptions<Consultation, unknown, unknown>,
) => {
  return useMutation(
    (updatedConsultation: Consultation) => updateConsultation(updatedConsultation),
    {
      ...options,
    },
  );
};
