import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteProfessionalExperience } from '../../service/account/professional-info';
import { PROFESSIONAL_INFORMATION_QUERY_KEY } from './useProfessionalInformationQuery';

export const useDeleteProfessionalExperience = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => deleteProfessionalExperience(id), {
    onSuccess: () => {
      queryClient.refetchQueries(PROFESSIONAL_INFORMATION_QUERY_KEY);
    },
    ...options,
  });
};
