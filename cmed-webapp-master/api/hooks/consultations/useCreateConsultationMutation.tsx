import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  DoctorBooking,
  ConsultationBooking,
} from '../../../components/Departments/Doctors/types';
import { createConsultation } from '../../service/consultations';

export const useCreateConsultationMutation = (
  options: UseMutationOptions<unknown, unknown, unknown>,
) => {
  return useMutation(
    (consultation: ConsultationBooking) => createConsultation(consultation),
    {
      ...options,
    },
  );
};
